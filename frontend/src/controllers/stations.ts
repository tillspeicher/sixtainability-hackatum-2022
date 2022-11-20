import React from "react"

import { STATION_LIST_ENDPOINT } from "./consts"
import { loadData } from "./utils"
import { ListItem, MapItem, Station } from "./definitions"

export function useStations(): Station[] | null {
    const [stations, setStations] = React.useState<Station[] | null>(null)
    React.useEffect(() => {
        if (stations != null) return
        loadData(STATION_LIST_ENDPOINT)
            .then(data => setStations(data as Station[]))
    }, [])

    return stations
}

export function stationsToListItems(stations: Station[]): ListItem[] {
    return stations.map((station) => ({
        id: station.id,
        title: station.title,
        subtitle: station.subtitle,
    }))
}

export function stationsToMapItems(stations: Station[]): MapItem[] {
    return stations.map((station) => ({
        id: station.id,
        lat: station.lat,
        lng: station.lng,
    }))
}
