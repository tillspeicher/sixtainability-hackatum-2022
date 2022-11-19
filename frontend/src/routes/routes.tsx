import { RouterProvider, createBrowserRouter } from "react-router-dom/dist"

import { ErrorPage } from "~/components/ErrorPage"
import { Base } from "~/layouts/Base"
import { Home } from "~/pages/Home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
])

export function AppRoutes() {
  return <RouterProvider router={router} />
}
