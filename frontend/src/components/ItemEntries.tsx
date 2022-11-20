import React from "react"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

import { User } from "~/controllers/users"
import { Charger } from "~/controllers/chargers"
import { Station } from "~/controllers/stations"
import { ItemType } from "~/controllers/definitions"
import { ItemIcon } from "~/components/ItemIcon"


type UserEntryProps = {
    user: User
    onChangeUser: (userId: string, promote: boolean) => void
}

const BUTTON_COL = "white"

export const UserEntry: React.FC<UserEntryProps> = ({ user, onChangeUser }) => {
    return (
        <BaseItemEntry
            itemType="user"
            title={user.name}
        >
            <div className="flex w-full flex-col content-center justify-center">
                <p className="text-gray-200 text-md h-full text-bottom">
                    {user.address}
                </p>
                <div className="flex w-1/2 h-12 m-1 bg-green-500 content-center justify-center"
                    onClick={() => onChangeUser(user.id, true)}>
                    <FontAwesomeIcon icon={faThumbsUp} className={"fa-2xl"} color={BUTTON_COL}/>
                </div>
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
    <Accordion className="w-full flex justify-between content-start py-2 border-solid border-t-b border-b-0 border-x-0 border-zinc-700 bg-zinc-800 flex-col" elevation={0}>
        <AccordionSummary>
            <div className="flex flex-row" onClick={() => setExpanded(expanded => !expanded)}>
                <ItemIcon itemType={itemType} />
                <div className="flex flex-col">
                    <p className="text-white text-xl h-full text-bottom">{title}</p>
                </div>
            </div>
        </AccordionSummary>
        <AccordionDetails>
            {children}
        </AccordionDetails>
    </Accordion>
  )
}