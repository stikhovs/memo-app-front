import { CardSetBasicInfo } from "@/utils/types";

export async function getCardSetsBasicInfo(): Promise<CardSetBasicInfo[]> {
    return fetch(`${process.env.API_URL}/titles-and-ids?userId=${1}`, {
        cache: "no-cache"
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data: CardSetBasicInfo[]) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.log(error)
            return [] as CardSetBasicInfo[];
        });
}