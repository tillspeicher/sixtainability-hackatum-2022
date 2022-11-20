export type ListItem = {
    id: string
    title: string
    subtitle: string
}

export type MapItem = {
    id: string
    lat: number
    lng: number
}

export type ItemType = "area" | "user" | "charger" | "station"
