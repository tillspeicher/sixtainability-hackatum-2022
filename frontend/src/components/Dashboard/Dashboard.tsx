import { Box, Typography } from "@mui/material"
import Slider from "@mui/material/Slider"
import Switch from "@mui/material/Switch"
import mapboxgl from "mapbox-gl"
import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"
import { ReactNode } from "react"
import Iframe from "react-iframe"

import polygon from "~/constants/polygons.json"

import { DashboardBox } from "../DashboardBox"

import type { DashboardProps } from "./types"
import {Footer} from "~/components/Footer";
import {Header} from "~/components/Header";

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
    <div className="w-full h-screen bg-black flex flex-col overflow-hidden">
      <div className="flex w-full h-full pt-2 content-center justify-center flex-row">
        <div className="h-full w-3/12 px-1.5">
          <DashboardBox title={"Controls"}>
            <SwitchControl title="Areas" valueId="areas" />
            <SwitchControl title="Users" valueId="users" />
            <SwitchControl title="Chargers" valueId="charger" />
            <SwitchControl title="Stations" valueId="stations" />
          </DashboardBox>
        </div>
        <div className="h-full w-6/12 px-1.5">
          <DashboardBox>
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
        <div className="h-full w-3/12 px-1.5">
          <DashboardBox title={"Info"}>
            <InfoItem
              title={"Max Mustermann"}
              subtitle={"Braunstr. 15, 86743 MUC"}
            />
            <InfoItem
              title={"Oma Inge"}
              subtitle={"Drueckergasse 4, 87393 MUC"}
            />
            <InfoItem
              title={"Dirk Dings"}
              subtitle={"Breite Allee 16, 87583 MUC"}
            />
          </DashboardBox>
        </div>
      </div>
      <Footer/>
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

type SwitchControlProps = {
  title: string
  valueId: string
}

const SwitchControl: React.FC<SwitchControlProps> = (props) => {
  return (
    <ListEntry>
      <p className="text-white text-xl w-20 h-full text-bottom">
        {props.title}
      </p>
      <Switch aria-label={props.valueId} />
    </ListEntry>
  )
}

type InfoItemProps = {
  title: string
  subtitle: string
}

const InfoItem: React.FC<InfoItemProps> = (props) => {
  return (
    <ListEntry hoverable>
      <div className="flex flex-col ">
        <p className="text-white text-xl h-full text-bottom">{props.title}</p>
        <p className="text-gray-200 text-lg h-full text-bottom">
          {props.subtitle}
        </p>
      </div>
    </ListEntry>
  )
}

type ListEntryProps = {
  hoverable?: boolean
  children: ReactNode
}

const ListEntry: React.FC<ListEntryProps> = (props) => {
  return (
    <div
      className={`w-full flex justify-between content-start py-2 border-solid border-t-b border-b-0 border-x-0 border-zinc-700 ${
        props.hoverable ? "hover:bg-zinc-700 cursor-pointer" : ""
      }`}
    >
      <div className="mx-6 w-full flex flex-row justify-between">
        {props.children}
      </div>
    </div>
  )
}
