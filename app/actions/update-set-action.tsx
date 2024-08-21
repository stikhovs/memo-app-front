'use server'

import { CardSet } from '@/utils/types';

export default async function updateSet(newCardSet: CardSet): Promise<CardSet> {
    console.log(`API_URL: ${process.env.API_URL}`);

    return fetch(`${process.env.API_URL}/set/save`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newCardSet)
    })
        .then((response) => {
            if (!response.ok) {
                console.log(response);
                throw new Error('Response was not ok');
            }
            console.log("Saved!");
            return response.json();
        });
}