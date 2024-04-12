import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";
import { FilesContainer } from "./components";

const appRouting = [
  {
    path: "/",
    element: <FilesContainer />,
  },
  {
    path: "/folders/*",
    element: <FilesContainer />,
  },
];

export const router = createBrowserRouter([
  {
    element: <App />,
    children: appRouting,
    errorElement: <ErrorPage />,
  },
]);
