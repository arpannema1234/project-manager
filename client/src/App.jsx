import Addproject from "./components/Main/add-project";
import EmptyPage from "./components/Main/empty-page";
import Project from "./components/Main/project";
import MainProject from "./pages/main-project";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: () => <Navigate replace to="/projects" />,
    },
    {
      path: "/projects",
      element: <MainProject />,
      children: [
        { index: true, element: <EmptyPage /> },
        { path: ":projectId", element: <Project /> },
        { path: "new-project", element: <Addproject /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
