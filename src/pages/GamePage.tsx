import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { TCardInfo } from "./SetupPage";
import Card from "../components/Card";
import ResultModal from "../components/ResultModal";

export interface Player {
	name: string;
	value: string;
	bad: boolean;
}

export interface ResultState {
	player1: Player[];
	player2: Player[];
}

export default function GamePage() {
	const [showResult, setShowResult] = useState(false);
	const { readLocalStorageData } = useLocalStorage();
	const [turn, setTurn] = useState(1);
	const [result, setResult] = useState<ResultState>({
		player1: [],
		player2: [],
	});

	const info = readLocalStorageData();

	const isPlayer1Turn = turn % 2 === 1;

	const handleChoose = (cardInfo: TCardInfo) => {
		if (isPlayer1Turn) {
			setResult((prev) => ({ ...prev, player1: [...prev.player1, cardInfo] }));
		} else {
			setResult((prev) => ({ ...prev, player2: [...prev.player2, cardInfo] }));
		}

		setTurn((prev) => prev + 1);
	};

	useEffect(() => {
		let timeOutId = 0;
		if (info.cards.length === turn - 1) {
			timeOutId = setTimeout(() => {
				setShowResult(true);
			}, 1100);
		}

		return () => {
			clearTimeout(timeOutId);
		};
	}, [turn, info.cards.length]);

	return (
		<section>
			<div className="relative">
				<div
					className={`${
						isPlayer1Turn ? "text-blue-500" : "text-green-500"
					} text-center py-3 text-2xl font-semibold border-b border-slate-200 shadow-sm bg-white`}
				>
					{info.cards.length === turn - 1 ? (
						<div className="text-red-500">Game Over</div>
					) : (
						<div>{isPlayer1Turn ? info.player1 : info.player2}'s turn.</div>
					)}
				</div>
			</div>

			<div className="grid grid-cols-3 gap-3 p-3">
				{info.cards?.map((cardInfo: TCardInfo) => (
					<Card key={cardInfo.name} handleChoose={handleChoose} cardInfo={cardInfo} />
				))}
			</div>

			{/* result */}

			<div className="p-3">
				<table className="w-full">
					<tbody>
						<tr className="border">
							<th className="border-r">SN.</th>
							<th className="border-r">{info.player1}</th>
							<th className="px-2 py-1">{info.player2}</th>
						</tr>
						{Array.from({ length: info.cards.length / 2 }, (_, index) => index).map(
							(_, index: number) => (
								<tr key={index} className="border">
									<td className="px-2 py-1 border-r">{index + 1}</td>
									<td className="px-2 py-1 border-r">
										{result.player1[index]?.value}
									</td>
									<td className="px-2 py-1 border-r">
										{result.player2[index]?.value}
									</td>
								</tr>
							)
						)}
					</tbody>
				</table>
			</div>
			{showResult && (
				<ResultModal result={result} player1={info.player1} player2={info.player2} />
			)}
		</section>
	);
}
