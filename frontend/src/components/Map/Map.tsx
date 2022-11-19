import mapboxgl, { Map } from "mapbox-gl"
import { useEffect, useRef, useState } from "react"

import polygon from "~/constants/polygons.json"

import type { MapProps } from "./types"

mapboxgl.accessToken =
  "pk.eyJ1IjoibHVnaXRhbiIsImEiOiJjbDhqODRhMXQwdTlnM3ZvNTdtajh1enNuIn0.ThQMOek5mPSAAbPuJJqe8A"

export function MapBox({ prop = "Map" }: MapProps) {
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

  return <div ref={mapContainer} id="map" className="map-container" />
}
