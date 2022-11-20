import { MapItem, AreaInfo } from "~/controllers/definitions"

export type MapProps = {
  prop?: string
  users: MapItem[]
  chargers: MapItem[]
  stations: MapItem[]
  allItems: Record<string, unknown>
  showAreas: boolean
    onAreaSelected: (areaInfo: AreaInfo) => void
}
