import { createBrowserRouter } from "react-router";
import { MainLayout } from "../../Layouts/MainLayout";
import {
  SectionComponent,
  PrivateRouteComponent,
  FallBack404Component,
} from "../../components/index.components";
import { homeLoader } from "../loader";

import {
  MovieDetailsPage,
  WatchListPage,
  LoginAndSignUpPage,
} from "../../pages/index.page";

// index: true is for loading as initial page.
const router = createBrowserRouter([
  {
    path: "/login-and-sign",
    element: <LoginAndSignUpPage />,
  },
  {
    path: "/",
    element: <PrivateRouteComponent />, // protectedRoute -  CM
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <SectionComponent />,
            loader: homeLoader,
            errorElement: <FallBack404Component/>
          },
          {
            path: "watch-lists",
            element: <WatchListPage />,
            errorElement: <FallBack404Component/>
          },
          {
            path: "movie-details",
            element: <MovieDetailsPage />,
            errorElement: <FallBack404Component/>
          },
          {
            path: "*",
            element: <FallBack404Component />,
            errorElement: <FallBack404Component/>
          }
        ],
      },
    ],
    errorElement: <FallBack404Component/>
  },
]);

export default router;
