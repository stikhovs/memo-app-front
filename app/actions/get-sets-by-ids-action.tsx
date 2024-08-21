'use server'

import { CardSet } from "@/utils/types";

export async function getCardSetsByIds(ids: number[]): Promise<CardSet[]> {
    return await fetch(`${process.env.API_URL}/sets?userId=${1}&ids=${ids}`, {
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