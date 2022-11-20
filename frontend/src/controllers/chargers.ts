import React from "react"

import { CHARGER_LIST_ENDPOINT } from "./consts"
import { loadData } from "./utils"
import { ListItem, MapItem, Charger } from "./definitions"

export function useChargers(): Charger[] | null {
    const [chargers, setChargers] = React.useState<Charger[] | null>(null)
    React.useEffect(() => {
        if (chargers != null) return
        loadData(CHARGER_LIST_ENDPOINT)
            .then(data => setChargers(data as Charger[]))
    }, [])

    return chargers
}

export function chargersToListItems(chargers: Charger[]): ListItem[] {
    return chargers.map((charger) => ({
        id: charger.id,
        title: charger.name,
        subtitle: charger.vicinity,
    }))
}

export function chargersToMapItems(chargers: Charger[]): MapItem[] {
    return chargers.map((charger) => ({
        id: charger.id,
        lat: charger.lat,
        lng: charger.lng,
    }))
}
