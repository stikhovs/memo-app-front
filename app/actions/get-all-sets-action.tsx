import { CardSet } from "@/utils/types";

export async function getCardSets(): Promise<CardSet[]> {
    return fetch(`${process.env.API_URL}/set-by-user?userId=${1}`, {
        cache: "no-cache"
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data: CardSet[]) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.log(error)
            return [] as CardSet[];
        });
}