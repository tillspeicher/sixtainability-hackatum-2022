import Switch from "@mui/material/Switch"
import React, { ReactNode } from "react"

import { DashboardBox } from "../DashboardBox"
import { Map } from "../Map"
import type { DashboardProps } from "./types"
import {Footer} from "~/components/Footer"
import { ItemIcon } from "~/components/ItemIcon"
import { ItemType } from "~/controllers/definitions"
import { UserEntry, ListEntry } from "~/components/ItemEntries"

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
  const [showAreas, setShowAreas] = React.useState(true)

  return (
    <div className="w-full h-screen bg-black flex flex-col overflow-hidden">
      <div className="flex w-full h-full pt-2 content-center justify-center flex-row">
        <div className="h-full w-3/12 px-1.5">
          <DashboardBox title={"Controls"}>
            <SwitchControl
              title="Areas"
              switchType="area" onChange={() => {}} />
            <SwitchControl
              title="Users"
              switchType="user"
              onChange={setShowUsers}
            />
            <SwitchControl
              title="Chargers"
              switchType="charger"
              onChange={setShowChargers}
            />
            <SwitchControl
              title="Stations"
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
                        users.map((user) => (
                        <UserEntry key={user.id} user={user} />
                    ))}
                </div>
            </div>
          </DashboardBox>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

type SwitchControlProps = {
  title: string
  onChange: (activated: boolean) => void
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
            onChange={(e) => {
            props.onChange(e.target.checked)
            }}
      />
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
