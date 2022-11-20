import mapboxgl, { Map } from "mapbox-gl"
import { useEffect, useRef, useState, RefObject } from "react"

import polygon from "~/constants/polygons.json"
import { MapItem } from "~/controllers/definitions"

import type { MapProps } from "./types"

mapboxgl.accessToken =
  "pk.eyJ1IjoibHVnaXRhbiIsImEiOiJjbDhqODRhMXQwdTlnM3ZvNTdtajh1enNuIn0.ThQMOek5mPSAAbPuJJqe8A"

export function MapBox({
    prop = "Map",
    users,
    chargers,
    stations,
}: MapProps) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(11.576124)
  const [lat, setLat] = useState(48.137154)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [lng, lat],
      zoom: zoom,
    })

    map.current.on("load", () => {
        if (map.current == null) return
      // Add a source for the state polygons.
      for (const x in polygon as any) {
        // console.log(polygon[x])
        map.current.addSource(`${x}`, {
          type: "geojson",
          data: {
            type: "Polygon",
            coordinates: [polygon[x]],
          }, //JSON.stringify(polygon[0]),
        })

        // Add a layer showing the state polygons.
        map.current.addLayer({
          id: `${x}-layer`,
          type: "fill",
          source: `${x}`,
          paint: {
            "fill-color": "rgba(200, 100, 240, 0.4)",
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
    })
  })

    useMarkers(map, users)
    useMarkers(map, chargers)
    useMarkers(map, stations)

  return <div ref={mapContainer} id="map" className="map-container" />
}

function useMarkers(map: RefObject<mapboxgl.Map>, items: MapItem[]) {
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([])
    useEffect(() => {
        if (map.current == null) return

        markers.forEach((marker) => {
            marker.remove()
        })

        const newMarkers = []
        items.forEach((item) => {
            const marker = new mapboxgl.Marker()
                .setLngLat([item.lng, item.lat])
                .addTo(map.current)
            newMarkers.push(marker)
        })
        setMarkers(newMarkers)
    }, [items])
}
