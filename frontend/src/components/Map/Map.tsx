import mapboxgl, { Map, MapMouseEvent } from "mapbox-gl"
import { useEffect, useRef, useState } from "react"

import polygon from "~/constants/polygons.json"

import type { MapProps } from "./types"

mapboxgl.accessToken =
  "pk.eyJ1IjoibHVnaXRhbiIsImEiOiJjbDhqODRhMXQwdTlnM3ZvNTdtajh1enNuIn0.ThQMOek5mPSAAbPuJJqe8A"

let max_long = 0
let max_lat = 0
let min_long = 180
let min_lat = 180

// function intersect(latLng: any, minMax: any) {
//   console.log(latLng)
//   console.log(minMax)

//   if (latLng.lat >= minMax.min_lat && latLng.lat <= minMax.max_lat) {
//     if (latLng.long >= minMax.min_long && latLng.long <= minMax.min_long) {
//       return true
//     }
//   }
//   return false
// }

/**
 * @return {boolean} true if (lng, lat) is in bounds
 */
function contains(bounds: string | any[], lat: any, lng: any): number {
  //https://rosettacode.org/wiki/Ray-casting_algorithm
  let count = 0
  for (let b = 0; b < bounds[0].length; b++) {
    const vertex1 = bounds[0][b]
    const vertex2 = bounds[0][(b + 1) % bounds[0].length]
    if (west(vertex1, vertex2, lng, lat)) ++count
  }
  return count % 2

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

export function MapBox({ prop = "Map" }: MapProps) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(11.576123)
  const [lat, setLat] = useState(48.137152)
  const [zoom, setZoom] = useState(9)

  const geoJSON: any = { type: "FeatureCollection", features: [] }

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

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [lng, lat],
      zoom: zoom,
    })

    map.current.on(
      "load",
      () => {
        const x = "Munich"

        // Add a source for the state polygons.
        // for (const x in polygon as any) {
        map.current.addSource(`${x}`, {
          type: "geojson",
          data: geoJSON,
        })

        // Add a layer showing the state polygons.
        map.current.addLayer({
          id: `${x}-layer`,
          type: "fill",
          source: `${x}`,
          paint: {
            "fill-color": "rgba(200, 100, 240, 0.3)",
            "fill-outline-color": "rgba(200, 100, 240, 1)",
          },
        })

        // When a click event occurs on a feature in the states layer,
        // open a popup at the location of the click, with description
        // HTML from the click event's properties.
        map.current.on("click", `${x}-layer`, (e: any) => {
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.name)
            .addTo(map.current)

          // const t = contains(
          //   [polygon["Altstadt-Lehel"]],
          //   // e.features[0].geometry.coordinates,
          //   e.lngLat.lat,
          //   e.lngLat.lng
          // )
          // if (t == 0) {
          //   console.log("inside")
          // } else {
          //   console.log("outside")
          // }
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
      }
      //}
    )
  })

  return <div ref={mapContainer} id="map" className="map-container" />
}
