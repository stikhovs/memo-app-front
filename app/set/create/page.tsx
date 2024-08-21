'use client'

import { useState } from "react";
import { Card, CardSet } from "@/utils/types";
import Image from "next/image";
import createSet from "@/app/actions/create-set-action";

export default function createSetPage() {

    const [title, setTitle] = useState<string>('');

    const createEmptyCard = (): Card => { return { id: null, frontSide: '', backSide: '' } }

    const initCards = (initLength: number): Card[] => {
        const cards = new Array<Card>;
        for (let index = 0; index < initLength; index++) {
            cards.push(createEmptyCard());
        }
        return cards;
    };

    const [cardsArr, setCardsArr] = useState<Card[]>(initCards(3));

    const updateFrontSide = (indexToChange: number, newFrontSide: string) => {
        const newCardArr = cardsArr.map((card, index) => {
            if (index == indexToChange) {
                card.frontSide = newFrontSide;
            }
            return card;
        });
        setCardsArr(newCardArr);
    }

    const updateBacktSide = (indexToChange: number, newBackSide: string) => {
        const newCardArr = cardsArr.map((card, index) => {
            if (index == indexToChange) {
                card.backSide = newBackSide;
            }
            return card;
        });
        setCardsArr(newCardArr);
    }

    const addNewCard = () => {
        setCardsArr(cardsArr.concat(createEmptyCard()));
    }

    const removeCard = (indexToRemove: number) => {
        const newArr = cardsArr.filter((card, index) => index != indexToRemove);
        setCardsArr(newArr);
    }

    const buildSet = (): CardSet => {
        return { id: null, uuid: null, title: title, cards: cardsArr }
    }

    const create = () => {
        createSet(buildSet())
        .then(res => {
            console.log("Saved!");
            console.log(res);
        })
    }

    return (
        <>
            <h1>create set</h1>
            <h2><input onChange={(e) => setTitle(e.target.value)} value={title} placeholder="title of your set" /></h2>
            <button onClick={create}>Save</button>
            {
                cardsArr.map((card, index) => {
                    return <div key={index} className="flex mb-2 items-baseline">
                        <span className="mr-2 text-md sm:text-lg">{index + 1}</span>
                        <div className="grid grid-cols-2 gap-4 bg-white px-4 py-6 w-full rounded shadow-sm">
                            <div className="border-b border-sky-700 text-lg sm:text-xl self-end">
                                <input className="text-sky-800" placeholder="Enter frontside" value={card.frontSide} onChange={(e) => updateFrontSide(index, e.target.value)} />
                            </div>
                            <div className="border-b border-sky-700 text-lg sm:text-xl self-end">
                                <input className="text-sky-800" placeholder="Enter backside" value={card.backSide} onChange={(e) => updateBacktSide(index, e.target.value)} />
                            </div>
                        </div>
                        <button onClick={() => removeCard(index)}
                            className="flex self-start justify-center items-center p-1
                            size-8 ml-2
                            rounded 
                            bg-sky-200 shadow
                            hover:bg-sky-300">
                            <Image src={'/trash-bin.svg'} alt="remove" width={25} height={25} className="" />
                        </button>
                    </div>
                })
            }
            <button onClick={addNewCard}>Add card</button>
        </>
    );
}