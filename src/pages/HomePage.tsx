import { BadgePlus, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function HomePage() {
	const { readLocalStorageData } = useLocalStorage();
	const data = readLocalStorageData();

	return (
		<section className="h-full">
			<div className="flex h-full flex-col justify-center items-center">
				<img src="/brand.png" className="w-[300px]" alt="pick the card" />
				<div className="flex flex-col gap-3 mt-6">
					<Link to="setup">
						<button className="uppercase items-center flex gap-1.5 bg-blue-500 text-white px-6 font-semibold py-2 rounded-full hover:bg-blue-600">
							<BadgePlus size={19} /> New game
						</button>
					</Link>
					<Link to="game">
						<button
							disabled={!data?.player1}
							className="disabled:bg-slate-400 uppercase items-center flex gap-1.5 bg-blue-400 text-white px-6 font-semibold py-2 rounded-full hover:bg-blue-500"
						>
							<Play size={19} /> Continue
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}
