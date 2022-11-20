import Switch from "@mui/material/Switch"
import React, { ReactNode } from "react"

import { Footer } from "~/components/Footer"
import { ItemIcon } from "~/components/ItemIcon"
import { ItemType } from "~/controllers/definitions"
import { UserEntry, ListEntry } from "~/components/ItemEntries"

import { DashboardBox } from "../DashboardBox"
import { Map } from "../Map"

import type { DashboardProps } from "./types"

import {
  chargersToListItems,
  chargersToMapItems,
  useChargers,
} from "~/controllers/chargers"
import {
  stationsToListItems,
  stationsToMapItems,
  useStations,
} from "~/controllers/stations"
import {
  useUsers,
  usersToListItems,
  usersToMapItems,
} from "~/controllers/users"

export function Dashboard({ prop = "Dashboard" }: DashboardProps) {
  const users = useUsers()
  const chargers = useChargers()
  const stations = useStations()

  const [showUsers, setShowUsers] = React.useState(false)
  const [showChargers, setShowChargers] = React.useState(false)
  const [showStations, setShowStations] = React.useState(false)
  const [showAreas, setShowAreas] = React.useState(false)

  return (
    <div className="w-full h-screen bg-black flex flex-col overflow-hidden">
      <div className="flex w-full h-full pt-2 content-center justify-center flex-row">
        <div className="h-full w-3/12 px-1.5">
          <DashboardBox title={"Controls"}>
            <SwitchControl
              title="Areas"
              checked={showAreas}
              switchType="area"
              onChange={setShowAreas}
            />
            <SwitchControl
              title="Users"
              checked={showUsers}
              switchType="user"
              onChange={setShowUsers}
            />
            <SwitchControl
              title="Chargers"
              checked={showChargers}
              switchType="charger"
              onChange={setShowChargers}
            />
            <SwitchControl
              title="Stations"
              checked={showStations}
              switchType="station"
              onChange={setShowStations}
            />
          </DashboardBox>
        </div>
        <div className="h-full w-6/12 px-1.5">
          <DashboardBox>
            <Map
              users={usersToMapItems(showUsers ? users ?? [] : [])}
              chargers={chargersToMapItems(showChargers ? chargers ?? [] : [])}
              stations={stationsToMapItems(showStations ? stations ?? [] : [])}
              allItems={{
                users: users,
                chargers: chargers,
                stations: stations,
              }}
              showAreas={showAreas}
            />
          </DashboardBox>
        </div>
        <div className="h-full w-3/12 px-1.5">
          <DashboardBox title={"Info"}>
            <div className="w-full h-full overflow-y-auto">
              <div className="w-full">
                {users &&
                  users.map((user) => <UserEntry key={user.id} user={user} />)}
              </div>
            </div>
          </DashboardBox>
        </div>
      </div>
      <Footer />
    </div>
  )
}

type SwitchControlProps = {
  title: string
  onChange: (activated: boolean) => void
  checked: boolean
  switchType: ItemType
}

const SwitchControl: React.FC<SwitchControlProps> = (props) => {
  return (
    <ListEntry>
      <ItemIcon itemType={props.switchType} />
      <p className="text-white text-xl w-20 h-full text-bottom">
        {props.title}
      </p>
      <Switch
        aria-label={props.switchType}
        checked={props.checked}
        onChange={(e) => {
          props.onChange(e.target.checked)
        }}
      />
    </ListEntry>
  )
}
