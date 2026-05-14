import React from "react";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import MatchCardsGame from "./pages/MatchCardsGame";
import About from "./pages/About";
import ShowHighScores from "./pages/ShowHighScores";
import Error500 from "./pages/Error500";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MatchCardsGame />,
      errorElement: <Error500 />
    },
    {
      path: "/about",
      element: <About/>
    },
    {
      path: "/scores",
      element: <ShowHighScores/>
    }
  ]);
   return(
      <RouterProvider router={router}/>  
   );
  
}

export default App;
