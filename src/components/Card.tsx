import { EyeOff, Laugh, ThumbsUp } from "lucide-react";
import { TCardInfo } from "../pages/SetupPage";
import { useState } from "react";

export default function Card({
	cardInfo,
	handleChoose,
}: {
	cardInfo: TCardInfo;
	handleChoose: (cardInfo: TCardInfo) => void;
}) {
	const [reveal, setReveal] = useState(false);

	const revealCard = () => {
		setReveal(true);
	};

	return (
		<button
			className="bg-purple-100 border disabled:shadow-none disabled:bg-slate-100 border-blue-300 text-center grid place-content-center p-3 h-[150px] rounded-lg hover:shadow-lg cursor-pointer"
			onClick={() => {
				handleChoose(cardInfo);
				revealCard();
			}}
			disabled={reveal}
		>
			<div>
				{reveal ? (
					<div className="flex flex-col items-center justify-center gap-2">
						<div>{cardInfo.value}</div>
						{cardInfo.bad ? <Laugh color="#ff4a4a" /> : <ThumbsUp color="green" />}
					</div>
				) : (
					<EyeOff size={35} color="gray" />
				)}
			</div>
		</button>
	);
}
