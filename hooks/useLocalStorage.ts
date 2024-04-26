import { TCardInfo } from "../src/pages/SetupPage";

type TData = {
	player1: string;
	player2: string;
	cardsNumber: number;
	cards: TCardInfo[] | [];
};

export function useLocalStorage() {
	const setToLocalStorage = (formData: TData) => {
		localStorage.setItem("cardsInfo", JSON.stringify(formData));
	};

	const readLocalStorageData = () => {
		const res = localStorage.getItem("cardsInfo");
		if (!res) {
			return {};
		}
		return JSON.parse(res || "");
	};

	return {
		setToLocalStorage,
		readLocalStorageData,
	};
}
