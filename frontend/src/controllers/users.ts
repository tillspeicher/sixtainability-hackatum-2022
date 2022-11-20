import React from "react"

import { USER_LIST_ENDPOINT } from "./consts"
import { ListItem, MapItem, User } from "./definitions"
import { loadData } from "./utils"

export function useUsers(): User[] | null {
  const [users, setUsers] = React.useState<User[] | null>(null)
  React.useEffect(() => {
    if (users != null) return
    loadData(USER_LIST_ENDPOINT).then((data) => setUsers(data as User[]))
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

export function usersToMapItems(users: User[]): MapItem[] {
  return users.map((user) => ({
    id: user.id,
    lat: user.lat,
    lng: user.lng,
  }))
}
