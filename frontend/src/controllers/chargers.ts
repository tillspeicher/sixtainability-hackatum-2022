import React from "react"

import { CHARGER_LIST_ENDPOINT } from "./consts"
import { loadData } from "./utils"
import { ListItem, MapItem, Charger, User } from "./definitions"

type ChargerState = {
    chargers: Charger[] | null
    userChargers: Map<string, Charger[]>
    setUserAsCharger: (areaName: string, user: User, isCharger: boolean) => void
}

export function useChargers(): ChargerState {
    const [chargers, setChargers] = React.useState<Charger[] | null>(null)
    const [userChargers, setUserChargers] = React.useState<Map<string, Charger[]>>(new Map())
    React.useEffect(() => {
        if (chargers != null) return
        loadData(CHARGER_LIST_ENDPOINT)
            .then(data => setChargers(data as Charger[]))
    }, [])

    const setUserAsCharger = React.useCallback((areaName: string, user: User, isPromoted: boolean) => {
        console.log("selecting user:", user)
        let areaChargers = userChargers.get(areaName)
        if (areaChargers == undefined) {
            areaChargers = []
        }
        if (isPromoted) {
            areaChargers.push({
                id: user.id,
                name: `Juice by ${user.name}`,
                vicinity: user.address,
                lat: user.lat,
                lng: user.lng,
                belongsToUser: user.id,
            })
        } else {
            areaChargers = areaChargers.filter(userCharger=> (
                userCharger.belongsToUser != user.id
            ))
        }
        setUserChargers(userChargers => {
            userChargers.set(areaName, areaChargers)
            return userChargers
        })
    }, [userChargers])

    return React.useMemo<ChargerState>(() => ({
        chargers: chargers,
        userChargers,
        setUserAsCharger,
    }), [chargers, userChargers, setUserAsCharger])
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
