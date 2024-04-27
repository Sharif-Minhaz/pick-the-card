import { TData } from "../../hooks/useLocalStorage";
import { Player, ResultState } from "../pages/GamePage";

interface Props {
	info: TData;
	allCards: Player[];
	result: ResultState;
}

export default function Table({ info, allCards, result }: Props) {
	return (
		<div className="p-3 w-full">
			<table className="w-full">
				<tbody>
					<tr className="border">
						<th className="border-r">SN.</th>
						<th className="border-r">{info.player1}</th>
						<th className="px-2 py-1">{info.player2}</th>
					</tr>
					{Array.from({ length: allCards.length / 2 }, (_, index) => index).map(
						(_, index: number) => (
							<tr key={index} className="border">
								<td className="px-2 py-1 border-r">{index + 1}</td>
								<td
									className={`px-2 py-1 border-r ${
										result?.player1[index]?.bad
											? "text-red-400"
											: "text-green-400"
									}`}
								>
									{result.player1[index]?.value}
								</td>
								<td
									className={`px-2 py-1 border-r ${
										result?.player2[index]?.bad
											? "text-red-400"
											: "text-green-400"
									}`}
								>
									{result.player2[index]?.value}
								</td>
							</tr>
						)
					)}
				</tbody>
			</table>
		</div>
	);
}
