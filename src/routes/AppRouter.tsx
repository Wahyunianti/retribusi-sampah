import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ErrorPage } from "../pages/ErrorPage";
import { LoadScreen } from "../components/loading/LoadScreen";

const MainLayout = lazy(() => import("../pages/layout/MainLayout"));
const Home = lazy(() => import("../pages/Home"));
const Retribusi = lazy(() => import("../pages/Retribusi"));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <MainLayout />
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: (
                    <Home />
                ),
            },
            {
                path: "retribusi",
                element:
                    <Retribusi />,
                errorElement: <ErrorPage />,

            }
        ]
    }
]);

const AppRouter = () => {
    return (
        <Suspense fallback={<LoadScreen />}>
            <RouterProvider router={router} />
        </Suspense>
    );
};

export default AppRouter;
