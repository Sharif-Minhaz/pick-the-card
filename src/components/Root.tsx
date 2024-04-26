import { Outlet } from "react-router-dom";

export default function Root() {
	return (
		<main className="p-4 overflow-hidden">
			<div
				id="main-root"
				className="h-[calc(100vh-32px)] relative overflow-y-auto max-w-[500px] rounded-md mx-auto border-4 border-blue-300 shadow-lg"
			>
				<div className="h-full bg-[url(/pat.png)] bg-repeat bg-white/80">
					<Outlet />
				</div>
			</div>
		</main>
	);
}
