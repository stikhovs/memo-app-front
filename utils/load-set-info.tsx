import { CardSet } from "@/utils/types";

export async function getSetInfo(setId: number): Promise<CardSet> {
    return fetch(`${process.env.API_URL}/set/${setId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data: CardSet) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.log(error)
            throw error;
        });
}