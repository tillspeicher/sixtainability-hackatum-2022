import { Box, Typography } from "@mui/material"
import Slider from "@mui/material/Slider"
import * as mapboxgl from "mapbox-gl"
import React, { useEffect, useRef, useState } from "react"
import Iframe from "react-iframe"

import polygon from "~/constants/polygons.json"

import { DashboardBox } from "../DashboardBox"

import type { DashboardProps } from "./types"

// import mapboxgl from "!mapbox-gl" // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoibHVnaXRhbiIsImEiOiJjbDhqODRhMXQwdTlnM3ZvNTdtajh1enNuIn0.ThQMOek5mPSAAbPuJJqe8A"

export function Dashboard({ prop = "Dashboard" }: DashboardProps) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(11.576124)
  const [lat, setLat] = useState(48.137154)
  const [zoom, setZoom] = useState(9)

  // const loadData = JSON.stringify(polygon["Schwabing-West"])
  // console.log(loadData)

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
      for (const x in polygon) {
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
        map.current.on("click", `${x}-layer`, (e) => {
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

  return (
    <div className="w-full h-screen bg-black">
      <div className="w-full h-12 bg-zinc-800 drop-shadow-md mb-1 justify-center content-center">
        <p className="text-orange text-center text-xl">Such EVs, much wow</p>
      </div>
      <div className="table w-full h-full pt-2">
        <div className="table-cell h-full w-3/12 px-1.5">
          <DashboardBox title={"Info"}>Cars, Drivers, etc.</DashboardBox>
        </div>
        <div className="table-cell h-full w-6/12 px-1.5">
          <DashboardBox title={"Map"}>
            <div ref={mapContainer} className="map-container" />
            {/* <Iframe
              url="http://127.0.0.1:5000"
              width="100%"
              height="100%"
              id="myId"
              styles={{ borderWidth: "0" }}
            /> */}
          </DashboardBox>
        </div>
        <div className="table-cell h-full w-3/12 px-1.5">
          <DashboardBox title={"Controls"}>
            <div className="p-4">
              <SliderControl title={"New driver arrival rate"} />
              <SliderControl title={"Charged return probability"} />
            </div>
          </DashboardBox>
        </div>
      </div>
    </div>
  )
}

type SliderControlProps = {
  title: string
}

const SliderControl: React.FC<SliderControlProps> = (props) => {
  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="body1" color="inherit" component="div">
        New driver arrival rate
      </Typography>
      <Slider />
    </Box>
  )
}
