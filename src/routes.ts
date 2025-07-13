import { createBrowserRouter } from "react-router";
import Home from "./pages/home";
import Project from "./pages/project";

export const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    Component: Home,
  },
  {
    path: "/project/:id",
    Component: Project,
  },
]);
