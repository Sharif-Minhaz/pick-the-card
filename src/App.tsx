import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SetupPage from "./pages/SetupPage";
import GamePage from "./pages/GamePage";
import Root from "./components/Root";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "setup",
				element: <SetupPage />,
			},
			{
				path: "game",
				element: <GamePage />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
