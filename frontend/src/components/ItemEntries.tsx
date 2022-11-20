import React from "react"

import { User } from "~/controllers/users"
import { Charger } from "~/controllers/chargers"
import { Station } from "~/controllers/stations"
import { ItemType } from "~/controllers/definitions"
import { ItemIcon } from "~/components/ItemIcon"


type UserEntryProps = {
    user: User

}

export const UserEntry: React.FC<UserEntryProps> = ({ user }) => {
    return (
        <BaseItemEntry
            itemType="user"
            title={user.name}
        >
            <p className="text-gray-200 text-lg h-full text-bottom">
                {user.address}
            </p>
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
    <ListEntry hoverable>
        <div className="flex flex-row" onClick={() => setExpanded(expanded => !expanded)}>
            <ItemIcon itemType={itemType} />
            <div className="flex flex-col">
            <>

                <p className="text-white text-xl h-full text-bottom">{title}</p>
                {isExpanded && (
                    {children}
                )}
            </>
            </div>
        </div>
    </ListEntry>
  )
}

type ListEntryProps = {
  hoverable?: boolean
  children: React.ReactNode
}

export const ListEntry: React.FC<ListEntryProps> = (props) => {
  return (
    <div
      className={`w-full flex justify-between content-start py-2 border-solid border-t-b border-b-0 border-x-0 border-zinc-700 ${
        props.hoverable ? "hover:bg-zinc-700 cursor-pointer" : ""
      }`}
    >
      <div className="mx-6 w-full flex flex-row justify-between">
        {props.children}
      </div>
    </div>
  )
}
