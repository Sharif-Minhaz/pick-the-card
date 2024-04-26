import { BadgePlus, Repeat2, Trophy } from "lucide-react";
import { Player, ResultState } from "../pages/GamePage";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ResultModal({
	result,
	player1,
	player2,
}: {
	result: ResultState;
	player1: string;
	player2: string;
}) {
	const navigate = useNavigate();

	let player1Result = 0,
		player2Result = 0;

	result.player1.forEach((data: Player) => {
		if (!data.bad) {
			player1Result = player1Result + 1;
		}
	});

	result.player2.forEach((data: Player) => {
		if (!data.bad) {
			player2Result = player2Result + 1;
		}
	});

	const winner =
		player1Result > player2Result
			? { name: player1, score: player1Result }
			: { name: player2, score: player2Result };

	useEffect(() => {
		const mainRoot = document.getElementById("main-root");

		if (mainRoot) {
			mainRoot.style.overflow = "hidden";
			mainRoot.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
		}

		return () => {
			if (mainRoot) {
				mainRoot.style.overflow = "auto";
			}
		};
	}, []);

	return (
		<div className="h-full w-full absolute top-0 bg-black/40 grid place-content-center">
			<div className="w-[300px] bg-white rounded-md py-8 px-4 flex items-center justify-center flex-col text-center">
				<Trophy color="#fcc201" size={80} />
				<div className="mt-4">
					<h1 className="font-semibold text-xl mb-1">
						Congratulations! <span className="text-green-600">{winner.name}</span>
					</h1>
					<h2>
						Your scores: <span className="font-semibold">{winner.score}</span>
					</h2>
				</div>
				<div className="flex flex-col items-center gap-3 mt-6">
					<Link to="/setup">
						<button className="text-sm uppercase items-center flex gap-1.5 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
							<BadgePlus size={18} /> New game
						</button>
					</Link>
					<button
						onClick={() => navigate(0)}
						className="text-sm uppercase items-center flex gap-1.5 bg-blue-400 text-white px-4 py-2 rounded-full hover:bg-blue-500"
					>
						<Repeat2 size={18} /> Retry
					</button>
				</div>
			</div>
		</div>
	);
}
