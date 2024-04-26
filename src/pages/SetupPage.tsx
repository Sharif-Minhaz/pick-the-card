import { Swords, Undo2 } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useLocalStorage } from "./../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export type TCardInfo = { name: string; value: string; bad: boolean };

export default function SetupPage() {
	const { setToLocalStorage, readLocalStorageData } = useLocalStorage();
	const navigate = useNavigate();

	const prevData = readLocalStorageData();

	const [form, setForm] = useState({
		player1: prevData.player1 || "Player 1",
		player2: prevData.player2 || "Player 2",
		cardsNumber: prevData.cardsNumber || 6,
		cards: prevData.cards?.length
			? prevData.cards
			: [
					{ name: "card1", value: "", bad: false },
					{ name: "card2", value: "", bad: true },
					{ name: "card3", value: "", bad: false },
					{ name: "card4", value: "", bad: true },
					{ name: "card5", value: "", bad: true },
					{ name: "card6", value: "", bad: false },
			  ],
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		setForm((prev) => {
			const value = Number(e.target.value) - prev.cards?.length;

			const totalCards = Array.from({ length: value }, (_, index) => index);

			if (value > 0) {
				return {
					...prev,
					cardsNumber: prev.cards?.length + totalCards.length,
					cards: [
						...prev.cards,
						...totalCards.map((_, index) => ({
							name: `card${index + prev.cards?.length + 1}`,
							value: "",
							bad: index % 2 === 0,
						})),
					],
				};
			} else {
				return {
					...prev,
					cardsNumber: prev.cards + value,
					cards: [...prev.cards.slice(0, value)],
				};
			}
		});
	};

	const handleCardsData = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			cards: prev.cards.map((card: TCardInfo) =>
				card.name === name ? { ...card, value: value } : card
			),
		}));
	};

	const handleBad = (fieldName: string) => {
		setForm((prev) => ({
			...prev,
			cards: prev.cards.map((card: TCardInfo) =>
				card.name === fieldName ? { ...card, bad: !card.bad } : card
			),
		}));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setToLocalStorage(form);

		navigate("/game");
	};

	return (
		<section className="p-4">
			<h1 className="text-blue-600 font-semibold text-3xl">Setup for the game</h1>
			<hr className="mt-3" />
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-3 mt-4">
					<input
						className="border border-blue-200 px-4 py-2"
						type="text"
						name="player1"
						required
						onChange={handleChange}
						value={form.player1}
						placeholder="Enter player 1 name"
					/>
					<input
						className="border border-blue-200 px-4 py-2"
						type="text"
						name="player2"
						required
						onChange={handleChange}
						value={form.player2}
						placeholder="Enter player 2 name"
					/>
				</div>
				<div className="mt-4">
					<div className="border border-blue-200 px-4 py-2 w-full flex">
						<div className="w-full">How many cards?</div>
						<select
							onChange={handleSelect}
							defaultValue={form.cardsNumber}
							name="cardsNumber"
							id="cardsNumber"
							className="border-blue-200 border-l pl-3"
						>
							<option value="6">6</option>
							<option value="8">8</option>
							<option value="10">10</option>
							<option value="12">12</option>
							<option value="14">14</option>
							<option value="16">16</option>
							<option value="18">18</option>
							<option value="20">20</option>
						</select>
					</div>
				</div>

				<div className="flex flex-col gap-3 mt-4">
					{form.cards?.map((cardInfo: TCardInfo) => (
						<div key={cardInfo.name} className="flex w-full">
							<input
								className="border border-blue-200 px-4 py-2 w-full"
								name={cardInfo.name}
								required
								onChange={handleCardsData}
								value={cardInfo.value}
								placeholder={`Enter ${cardInfo.name} data`}
							/>
							<div className="border border-blue-300 flex gap-2 py-1 px-2 items-center">
								<label className="whitespace-nowrap" htmlFor="">
									is bad?
								</label>
								<input
									type="checkbox"
									onClick={() => handleBad(cardInfo.name)}
									defaultChecked={cardInfo.bad}
									className="cursor-pointer"
								/>
							</div>
						</div>
					))}
				</div>
				<div className="mt-5 flex gap-3">
					<button
						type="submit"
						className="uppercase items-center flex gap-1.5 bg-blue-500 text-white px-6 font-semibold py-2 rounded-full hover:bg-blue-600"
					>
						<Swords size={19} /> Save & Play
					</button>
					<button
						onClick={() => navigate(-1)}
						className="uppercase items-center flex gap-1.5 bg-purple-500 text-white px-6 font-semibold py-2 rounded-full hover:bg-purple-600"
					>
						<Undo2 size={19} /> Go back
					</button>
				</div>
			</form>
		</section>
	);
}
