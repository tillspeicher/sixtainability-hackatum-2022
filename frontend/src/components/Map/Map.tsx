import mapboxgl, { Map } from "mapbox-gl"
import { useEffect, useRef, useState, RefObject, FC } from "react"

import polygon from "~/constants/polygons.json"

import { MapItem, ItemType } from "~/controllers/definitions"
import { ItemIcon } from "~/components/ItemIcon"

import type { MapProps } from "./types"

mapboxgl.accessToken =
  "pk.eyJ1IjoibHVnaXRhbiIsImEiOiJjbDhqODRhMXQwdTlnM3ZvNTdtajh1enNuIn0.ThQMOek5mPSAAbPuJJqe8A"

let max_long = 0
let max_lat = 0
let min_long = 180
let min_lat = 180
let groupingTable: {
  [key: string]: {
    numCharger: number
    chargers: []
    users: []
    stations: []
  }
  minMax?: {
    min: number
    max: number
  }
} = null

export function MapBox({
  prop = "Map",
  users,
  chargers,
  stations,
  allItems,
  showAreas,
  onAreaSelected,
}: MapProps) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(11.576123)
  const [lat, setLat] = useState(48.137152)
  const [zoom, setZoom] = useState(13)

  const geoJSON: any = { type: "FeatureCollection", features: [] }

  if (geoJSON.features.length === 0) {
    for (const x in polygon as any) {
      const long = polygon[x][0][0]
      const lat = polygon[x][0][1]

      if (long > max_long) {
        max_long = long
      }
      if (long < min_long) {
        min_long = long
      }
      if (lat > max_lat) {
        max_lat = lat
      }
      if (lat < min_lat) {
        min_lat = lat
      }

      geoJSON.features.push({
        type: "Feature",
        properties: {
          name: x,
          minMax: {
            min_lat: min_lat,
            max_lat: max_lat,
            min_long: min_long,
            max_long: max_long,
          },
        },
        geometry: {
          type: "Polygon",
          coordinates: [polygon[x]],
        },
      })
    }
  }

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [lng, lat],
      zoom: zoom,
    })

    map.current.on("load", () => {
      const x = "Munich"

      // Add a layer showing the state polygons.
      geoJSON.features.forEach((e: any) => {
        const gradient =
          (groupingTable[e.properties.name].numCharger -
            groupingTable.minMax.min) /
          (groupingTable.minMax.max - groupingTable.minMax.min)

        const blue = 0
        const green = Math.round(gradient * 255)
        const red = Math.round(
          (-3 * (gradient * gradient) + 2.5 * gradient + 0.5) * 255
        )

        // Add a source for the state polygons.
        // for (const x in polygon as any) {
        map.current.addSource(`${e.properties.name}-source`, {
          type: "geojson",
          data: e,
        })
        map.current.addLayer({
          id: `${e.properties.name}-layer`,
          type: "fill",
          source: `${e.properties.name}-source`,
          layout: {
            // Make the layer visible by default.
            visibility: showAreas ? "visible" : "none",
          },
          paint: {
            "fill-color": `rgba(${red}, ${green}, ${blue}, 0.2)`,
            "fill-outline-color": "rgba(244, 129, 30, 1)",
          },
        })

        // When a click event occurs on a feature in the states layer,
        // open a popup at the location of the click, with description
        // HTML from the click event's properties.
        map.current.on("click", `${e.properties.name}-layer`, (x: any) => {
          new mapboxgl.Popup()
            .setLngLat(x.lngLat)
            .setHTML(x.features[0].properties.name)
            .addTo(map.current)

          const areaName = x.features[0].properties.name
          const areaData = groupingTable[areaName]
          console.log(areaData)
          onAreaSelected({
            areaName: areaName,
            ...areaData,
          })

          const easingFn = easingFunctions.easeOutQuint
          const duration = 3000
          const animate = true
          const center = [x.lngLat.lng, x.lngLat.lat]

          const animationOptions = {
            duration: duration,
            easing: easingFn,
            animate: animate,
            center: center,
            essential: true, // animation will happen even if user has `prefers-reduced-motion` setting on
          }

          // Create a random location to fly to by offsetting the map's
          // initial center point by up to 10 degrees.
          // const center = [
          //   -95 + (Math.random() - 0.5) * 20,
          //   40 + (Math.random() - 0.5) * 20,
          // ]

          // merge animationOptions with other flyTo options
          // let center = [x.lngLat.lng, x.lngLat.lat]
          animationOptions.center = center

          map.current.flyTo(animationOptions)

          map.current.getSource("center").setData({
            type: "Point",
            coordinates: center,
          })
          map.current.setLayoutProperty(
            "center",
            "text-field",
            `Center: [${center[0].toFixed(1)}, ${center[1].toFixed(1)}`
          )
        })
      })

      // Change the cursor to a pointer when
      // the mouse is over the states layer.
      map.current.on("mouseenter", `${x}-layer`, () => {
        map.current.getCanvas().style.cursor = "pointer"
      })

      // Change the cursor back to a pointer
      // when it leaves the states layer.
      map.current.on("mouseleave", `${x}-layer`, () => {
        map.current.getCanvas().style.cursor = ""
      })
    })
  }, [onAreaSelected])

  useEffect(() => {
    if (map.current == null) {
      return
    } else if (map.current.isStyleLoaded()) {
      geoJSON.features.forEach((e: any) => {
        // Toggle layer visibility by changing the layout object's visibility property.
        map.current.setLayoutProperty(
          `${e.properties.name}-layer`,
          "visibility",
          showAreas ? "visible" : "none"
        )
      })
    }
  }, [showAreas])

  useMarkers(map, users, "user")
  useMarkers(map, chargers, "charger")
  useMarkers(map, stations, "station")

  if (
    !groupingTable &&
    allItems.users &&
    allItems.chargers &&
    allItems.stations
  ) {
    createGroupingTable(allItems, geoJSON)
  }

  return (
    <div className="w-full h-full">
      {/* <div className="w-15, h-15 bg-red absolute" id="testid"/> */}
      {/* {users.map(user => <IconMarker key={user.id} itemType="user" id={user.id} />)} */}
      <div ref={mapContainer} id="map" className="map-container" />
    </div>
  )
}

const easingFunctions = {
  // start slow and gradually increase speed
  easeInCubic: function (t) {
    return t * t * t
  },
  // start fast with a long, slow wind-down
  easeOutQuint: function (t) {
    return 1 - Math.pow(1 - t, 5)
  },
  // slow start and finish with fast middle
  easeInOutCirc: function (t) {
    return t < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2
  },
  // fast start with a "bounce" at the end
  easeOutBounce: function (t) {
    const n1 = 7.5625
    const d1 = 2.75

    if (t < 1 / d1) {
      return n1 * t * t
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375
    }
  },
}

function useMarkers(
  map: RefObject<mapboxgl.Map>,
  items: MapItem[],
  itemType: ItemType
) {
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([])
  useEffect(() => {
    if (map.current == null) return

    markers.forEach((marker) => {
      marker.remove()
    })

    let color: string
    if (itemType === "user") {
      color = "#bb0000"
    } else if (itemType === "charger") {
      color = "#f4e61f"
    } else {
      color = "#ff5f00"
    }
    const newMarkers = []
    items.forEach((item) => {
      // const markerElement = document.getElementById(`${itemType}-${item.id}`)
      // const markerElement = document.getElementById("testid")
      const marker = new mapboxgl.Marker({
        // element: markerElement,
        color: color,
        scale: 0.7,
      })
        .setLngLat([item.lng, item.lat])
        .addTo(map.current)
      newMarkers.push(marker)
    })
    setMarkers(newMarkers)
  }, [items])
}

function createGroupingTable(allItems: any, geoJSON: any) {
  groupingTable = {}
  // initialize table with 0 chargers
  geoJSON.features.forEach((area: any) => {
    groupingTable[area.properties.name] = {
      numCharger: 0,
      chargers: [],
      users: [],
      stations: [],
    }
  })

  let min = 100
  let max = 0

  geoJSON.features.forEach((area: any) => {
    allItems.chargers.forEach((charger: any) => {
      if (contains(area.geometry.coordinates, charger.lat, charger.lng)) {
        if (groupingTable[area.properties.name] !== undefined) {
          // increment count of number of chargers
          groupingTable[area.properties.name].numCharger += 1
          groupingTable[area.properties.name].chargers.push(charger)

          // update max
          if (max < groupingTable[area.properties.name].numCharger) {
            max = groupingTable[area.properties.name].numCharger
          }
        }
      }
    })
    allItems.users.forEach((user: any) => {
      if (contains(area.geometry.coordinates, user.lat, user.lng)) {
        if (groupingTable[area.properties.name] !== undefined) {
          groupingTable[area.properties.name].users.push(user)
        }
      }
    })
    allItems.stations.forEach((station: any) => {
      if (contains(area.geometry.coordinates, station.lat, station.lng)) {
        if (groupingTable[area.properties.name] !== undefined) {
          groupingTable[area.properties.name].stations.push(station)
        }
      }
    })
  })

  // update min
  for (const e in groupingTable as any) {
    if (min > groupingTable[e].numCharger) {
      min = groupingTable[e].numCharger
    }
  }

  // console.log(groupingTable)
  // console.log("min: " + min + ", max: " + max)

  groupingTable["minMax"] = {
    min: min,
    max: max,
  }
}

/**
 * @return {boolean} true if (lng, lat) is in bounds
 */
function contains(bounds: string | any[], lat: any, lng: any): boolean {
  let count = 0
  for (let b = 0; b < bounds[0].length; b++) {
    const vertex1 = bounds[0][b]
    const vertex2 = bounds[0][(b + 1) % bounds[0].length]
    if (west(vertex1, vertex2, lng, lat)) ++count
  }
  return count % 2 === 1

  /**
   * @return {boolean} true if (x,y) is west of the line segment connecting A and B
   */
  function west(
    A: [number, number], // { y: number; x: number },
    B: [number, number], // { y: number; x: number },
    x: number,
    y: number
  ): boolean {
    if (A[1] <= B[1]) {
      if (y <= A[1] || y > B[1] || (x >= A[0] && x >= B[0])) {
        return false
      } else if (x < A[0] && x < B[0]) {
        return true
      } else {
        return (y - A[1]) / (x - A[0]) > (B[1] - A[1]) / (B[0] - A[0])
      }
    } else {
      return west(B, A, x, y)
    }
  }
}

type IconMarkerProps = {
  itemType: ItemType
  id: string
}

const IconMarker: FC<IconMarkerProps> = ({ itemType, id }) => {
  return (
    <div id={`${itemType}-${id}`} className="absolute">
      <ItemIcon itemType />
    </div>
  )
}
