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

export type User = {
  id: string
  name: string
  address: string
  lat: number
  lng: number
    isPromoted?: boolean
}

export type Charger = {
    id: string
    name: string
    vicinity: string
    lat: number
    lng: number
    rating?: number
    user_ratings_total?: number
    belongsToUser?: string
}

export type Station = {
    id: string
    title: string
    subtitle: string
    type: string
    lat: number
    lng: number
}

export type AreaInfo = {
    areaName: string
    users: User[]
    chargers: Charger[]
    stations: Station[]
}
