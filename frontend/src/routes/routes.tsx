import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { ErrorPage } from "~/components/ErrorPage"
import { Base } from "~/layouts/Base"
import { Home } from "~/pages/Home"
import { Project } from "~/pages/Project"
import { Team } from "~/pages/Team"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/team",
        element: <Team />,
      },
      {
        path: "/project",
        element: <Project />,
      },
    ],
  },
])

export function AppRoutes() {
  return <RouterProvider router={router} />
}
