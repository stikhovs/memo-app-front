'use client'

import { Card } from "@/utils/types";
import { loadInitialSetInfo } from '@/app/actions/get-set-info-action';
import { useEffect, useState } from 'react';

type Props = {
  params: {
    id: number;
  };
};

export default function SetInfoPage({ params }: Props) {
  // console.log("Set id: " + params.id);
  const [cardsArr, setCardsArr] = useState<Card[]>([]);
  //const setInfo = [];//await getSetInfo(params.id);

  useEffect(() => {
    loadInitialSetInfo(params.id)
      .then(it => it.cards)
      .then(cards => setCardsArr(cards));
  },[]);

  const shuffle = () => {
    console.log("Shuffling...");
    const shuffledArray = [...cardsArr];
    shuffledArray.sort(() => Math.random() - 0.5);
    setCardsArr(shuffledArray);
  };

  return (
    <>
      <button onClick={shuffle}>Перемешать</button>
      {cardsArr.map(info => {
        return <div key={info.id}>
          <p>{info.frontSide} - {info.backSide}</p>
        </div>
      })}
    </>
  );
}
