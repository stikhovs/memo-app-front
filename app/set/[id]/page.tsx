'use client'

import { Card, CardSet } from "@/utils/types";
import { loadInitialSetInfo } from '@/app/actions/get-set-info-action';
import { useEffect, useState } from 'react';
import Image from "next/image";
import updateSet from "@/app/actions/update-set-action";
import ExerciseBlock from "@/components/exercise-block";

type Props = {
  params: {
    id: number;
  };
};

function createFlippedCard(card: Card): Card {
  return { id: card.id, frontSide: card.backSide, backSide: card.frontSide }
}



export default function SetInfoPage({ params }: Props) {
  const [cardsArr, setCardsArr] = useState<Card[]>([]);
  const [cardSet, setCardSet] = useState<CardSet>();
  const [titleOfSet, setTitleOfSet] = useState<string>();
  const [isEditEnabled, setIsEditEnabled] = useState<boolean>(false);

  useEffect(() => {
    loadInitialSetInfo(params.id)
      .then(it => {
        setCardSet(it);
        setTitleOfSet(it.title);
        setCardsArr(it.cards);
      })
  }, []);

  const toggleEdit = () => {
    setIsEditEnabled(!isEditEnabled);
  };

  const flip = () => {
    const flippedCards = cardsArr.map(card => createFlippedCard(card));
    setCardsArr(flippedCards);
  };

  const update = () => {
    const newCardSet = createCardSet(cardSet, titleOfSet, cardsArr);
    updateSet(newCardSet)
      .then(res => setCardSet(res));
  }

  const createCardSet = (oldCardSet: CardSet, title: string, cards: Card[]): CardSet => {
    return { id: oldCardSet.id, uuid: oldCardSet.uuid, title: title, cards: cards };
  }

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

  return (
    <>
      <ExerciseBlock cardSetId={cardSet?.id}/>
      <div className="ml-4 flex justify-between mb-3">
        {isEditEnabled ?
          <input className="text-3xl text-sky-700 self-end" value={titleOfSet} onChange={(e) => setTitleOfSet(e.target.value)} /> :
          <h2 className="text-3xl text-sky-700 self-end">{titleOfSet}</h2>
        }
        <div className="flex justify-end">
          <button onClick={flip}
            className="
              mr-2 
              flex justify-center items-center p-1
              size-10
              rounded 
              bg-sky-200 shadow 
              transition ease-in-out delay-50 duration-200
              hover:bg-sky-300">
            <Image src={'/flip-horizontal.svg'} alt="flip" width={35} height={35}
              className="" />
          </button>
          <button
            onClick={toggleEdit}
            className="
              mr-2 
              flex justify-center items-center p-1
              size-10
              rounded 
              bg-sky-200 shadow 
              transition ease-in-out delay-50 duration-200
              hover:bg-sky-300
            ">
            <Image src={'/pen.svg'} alt="edit" width={35} height={35}
              className="" />
          </button>
          <button onClick={update} className="px-3 py-1 bg-green-500 rounded">Save</button>
        </div>
      </div>
      <div>
        {cardsArr.map((card, index) => {
          return <div key={index} className="flex mb-2 items-baseline">
            <span className="mr-2 text-md sm:text-lg">{index + 1}</span>
            <div className="grid grid-cols-2 gap-4 bg-white px-4 py-6 w-full rounded shadow-sm">
              <div className="border-b border-sky-700 text-lg sm:text-xl self-end">
                {
                  isEditEnabled ?
                    <input className="text-sky-800" value={card.frontSide} onChange={(e) => updateFrontSide(index, e.target.value)} /> :
                    <span className="text-sky-800">{card.frontSide}</span>
                }
              </div>
              <div className="border-b border-sky-700 text-lg sm:text-xl self-end">
                {
                  isEditEnabled ?
                    <input className="text-sky-800" value={card.backSide} onChange={(e) => updateBacktSide(index, e.target.value)} /> :
                    <span className={`text-sky-800`}>{card.backSide}</span>
                }
              </div>
            </div>
          </div>
        })}
      </div>
    </>
  );
}
