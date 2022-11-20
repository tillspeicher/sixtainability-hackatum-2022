import React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons"

import { ItemType, User, Charger, Station } from "~/controllers/definitions"
import { ItemIcon } from "~/components/ItemIcon"

type UserEntryProps = {
  user: User
  onChangeUser: (userId: string, promote: boolean) => void
}

const BUTTON_COL = "white"

export const UserEntry: React.FC<UserEntryProps> = ({ user, onChangeUser }) => {
  const arr = user.address.split(",")
  return (
    <BaseItemEntry
      itemType={user.isPromoted ? "charger" : "user"}
      title={user.name}
    >
      <div className="flex w-full flex-col content-center justify-center">
        <p className="text-gray-200 text-md h-full text-bottom">
          {arr.map((a, i) => {
            return <p key={i}>{a}</p>
          })}
        </p>
        {!user.isPromoted ? (
          <div
            className="flex h-18 w-1/2 h-12 m-1 bg-green-500 content-center justify-center cursor-pointer rounded-md mt-3 mx-auto"
            onClick={() => onChangeUser(user.id, true)}
          >
            <FontAwesomeIcon
              icon={faThumbsUp}
              className={"fa-2xl pt-2"}
              color={BUTTON_COL}
            />
          </div>
        ) : (
          <div
            className="flex h-18 w-1/2 h-12 m-1 bg-red-500 content-center justify-center cursor-pointer rounded-md mt-3 mx-auto"
            onClick={() => onChangeUser(user.id, true)}
          >
            <FontAwesomeIcon
              icon={faThumbsDown}
              className={"fa-2xl pt-2"}
              color={BUTTON_COL}
            />
          </div>
        )}
      </div>
    </BaseItemEntry>
  )
}

type ChargerEntryProps = {
  charger: Charger
}

export const ChargerEntry: React.FC<ChargerEntryProps> = ({ charger }) => {
  return (
    <BaseItemEntry itemType="charger" title={charger.name}>
      <div className="flex w-full flex-col content-center justify-center">
        <p className="text-gray-200 text-md h-full text-bottom">
          {charger.vicinity}
        </p>
      </div>
    </BaseItemEntry>
  )
}

type StationEntryProps = {
  station: Station
}

export const StationEntry: React.FC<StationEntryProps> = ({ station }) => {
  return (
    <BaseItemEntry itemType="charger" title={station.title}>
      <div className="flex w-full flex-col content-center justify-center">
        <p className="text-gray-200 text-md h-full text-bottom">
          {station.subtitle}
        </p>
      </div>
    </BaseItemEntry>
  )
}

type BaseItemEntryProps = {
  itemType: ItemType
  title: string
  children: React.ReactNode
}

const BaseItemEntry: React.FC<BaseItemEntryProps> = ({
  itemType,
  title,
  children,
}) => {
  const [isExpanded, setExpanded] = React.useState(false)
  return (
    <Accordion
      className="w-full flex justify-between content-start py-2 border-solid border-t-b border-b-0 border-x-0 border-zinc-700 bg-zinc-800 flex-col"
      elevation={0}
    >
      <AccordionSummary>
        <div
          className="flex flex-row"
          onClick={() => setExpanded((expanded) => !expanded)}
        >
          <ItemIcon itemType={itemType} />
          <div className="flex flex-col">
            <p className="text-white text-xl h-full text-bottom">{title}</p>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}
