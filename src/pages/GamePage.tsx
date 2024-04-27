import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { TCardInfo } from "./SetupPage";
import Card from "../components/Card";
import ResultModal from "../components/ResultModal";
import Table from "../components/Table";

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
	const [allCards, setAllCards] = useState<Player[]>([]);

	const info = readLocalStorageData();
	// Function to generate a random number between 0 and 1
	const getRandomNumber = () => Math.random() - 0.5;

	useEffect(() => {
		setAllCards(info.cards?.sort(getRandomNumber));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
		if (allCards.length === turn - 1) {
			timeOutId = setTimeout(() => {
				setShowResult(true);
			}, 500);
		}

		return () => {
			clearTimeout(timeOutId);
		};
	}, [turn, allCards.length]);

	return (
		<section>
			<div
				className={`${
					isPlayer1Turn ? "text-blue-500" : "text-green-500"
				} text-center py-3 text-2xl font-semibold border-b border-slate-200 shadow-sm bg-white`}
			>
				{allCards.length === turn - 1 ? (
					<div className="text-red-500">Game Over</div>
				) : (
					<div>{isPlayer1Turn ? info.player1 : info.player2}'s turn.</div>
				)}
			</div>

			<div className="grid grid-cols-3 gap-3 p-3">
				{allCards?.map((cardInfo: TCardInfo) => (
					<Card key={cardInfo.name} handleChoose={handleChoose} cardInfo={cardInfo} />
				))}
			</div>

			{/* result */}
			<Table allCards={allCards} info={info} result={result} />

			{showResult && (
				<ResultModal result={result} player1={info.player1} player2={info.player2}>
					<Table allCards={allCards} info={info} result={result} />
				</ResultModal>
			)}
		</section>
	);
}
