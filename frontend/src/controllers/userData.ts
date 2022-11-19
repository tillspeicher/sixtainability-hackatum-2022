import React from "react"

import { USER_LIST_ENDPOINT } from "./consts"
import { loadData } from "./utils"
import { ListItem, MapItem } from "./definitions"

type User = {
    id: string
    name: string
    address: string
    lat: number
    lng: number
}

export function useUserData(): User[] | null {
    const [users, setUsers] = React.useState<User[] | null>(null)
    React.useEffect(() => {
        if (users != null) return
        loadData(USER_LIST_ENDPOINT)
            .then(data => setUsers(data as User[]))
    }, [])

    return users
}

export function usersToListItems(users: User[]): ListItem[] {
    return users.map((user) => ({
        id: user.id,
        title: user.name,
        subtitle: user.address,
    }))
}

export function usersToMapItem(users: User[]): MapItem[] {
    return users.map((user) => ({
        id: user.id,
        lat: user.lat,
        lng: user.lng,
    }))
}
