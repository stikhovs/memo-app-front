'use client'

import { Card, CardSetBasicInfo } from "@/utils/types";
import { useEffect, useState } from 'react';
import Image from "next/image";
import { getCardSetsByIds } from "@/app/actions/get-sets-by-ids-action";
import { useSearchParams } from "next/navigation";

interface ExerciseProps {
  sets: string
}

type Props = {
  params: {
    slug: number;
  };
};

type CardWithProps = {
  card: Card,
  isShown: boolean,
}

function createCardWithProps(card: Card, isShown: boolean = false): CardWithProps {
  return {
    card: card,
    isShown: isShown
  }
};

export default function LearnPage() {
  // const [cardsArr, setCardsArr] = useState<Card[]>([]);
  const [cardsWithProps, setCardsWithProps] = useState<CardWithProps[]>([]);
  const [isShowAll, setIsShowAll] = useState<boolean>(false);
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const selectedSetsIdsJson = searchParams.get('selectedSets');
  const selectedSetsIds: number[] = selectedSetsIdsJson ? JSON.parse(selectedSetsIdsJson) : [];

  // const cardSets = getCardSetsByIds(sets.map(s => s.id))

  useEffect(() => {
    getCardSetsByIds(selectedSetsIds)
      .then(res => {
        setSelectedTitles(res.map(set => set.title));
        return res;
      })
      .then(res => res.flatMap(set => set.cards))
      .then(res => res.map(card => createCardWithProps(card)))
      .then(res => setCardsWithProps(res));
  }, []);

  /* useEffect(() => {
    loadInitialSetInfo(params.slug)
      .then(it => {
        setTitleOfSet(it.title);
        return it.cards;
      })
      .then(cards => {
        //setCardsArr(cards);
        return cards.map(card => createCardWithProps(card));
      })
      .then(cardsWithProps => setCardsWithProps(cardsWithProps));
  }, []); */

  const shuffle = () => {
    hideAll();

    const shuffledArray = [...cardsWithProps];
    shuffledArray.sort(() => Math.random() - 0.5);
    setCardsWithProps(shuffledArray);
  };

  const hideAll = () => {
    const updated = [...cardsWithProps].map(card => {
      card.isShown = false;
      return card;
    })
    setCardsWithProps(updated);
    setIsShowAll(false);
  };

  const handleShowAll = () => {
    const newIsShowAll = !isShowAll;

    setIsShowAll(newIsShowAll);

    const updatedCards = cardsWithProps.map(card => createCardWithProps(card.card, newIsShowAll));
    setCardsWithProps(updatedCards);
  };


  const handleShowIndividual = (cardWithProps: CardWithProps) => {
    const updatedCards = cardsWithProps.map(c => {
      if (c.card.id === cardWithProps.card.id) {
        return createCardWithProps(cardWithProps.card, !cardWithProps.isShown);
      }
      return c;
    });

    setCardsWithProps(updatedCards);

    if (updatedCards.filter(card => card.isShown).length == updatedCards.length
      || updatedCards.filter(card => card.isShown).length == 0) {
      setIsShowAll(!isShowAll);
    }
  };

  return (
    <>

      <div className="ml-4 flex justify-between mb-3">
        {
          selectedTitles.length > 1 ?
            <h2 className="text-3xl text-sky-700 self-end">Selected: {selectedTitles.join()}</h2> :
            <h2 className="text-3xl text-sky-700 self-end">{selectedTitles[0]}</h2>
        }
        <div className="flex justify-end">
          <button onClick={shuffle}
            className="
              mr-2 
              flex justify-center items-center p-1
              size-10
              rounded 
              bg-sky-200 shadow 
              transition ease-in-out delay-50 duration-200
              hover:bg-sky-300">
            <Image src={'/shuffle.svg'} alt="shuffle" width={35} height={35}
              className="" />
          </button>
          <button onClick={handleShowAll}
            className="flex justify-center items-center p-1
              size-10
              rounded 
              bg-sky-200 shadow
              transition ease-in-out delay-50 duration-200
              hover:bg-sky-300">
            {isShowAll ?
              <Image src={'/eye.svg'} alt="open" width={35} height={35} className="" /> :
              <Image src={'/eye-closed.svg'} alt="hidden" width={35} height={35} className="" />}
          </button>
        </div>
      </div>
      <div>
        {cardsWithProps.map((info, index) => {
          return <div key={index} className="flex mb-2 items-baseline">
            <span className="mr-2 text-md sm:text-lg">{index + 1}</span>
            <div className="grid grid-cols-2 gap-4 bg-white px-4 py-6 w-full rounded shadow-sm">
              <div className="border-b border-sky-700 text-lg sm:text-xl self-end"><span className="text-sky-800">{info.card.frontSide}</span></div>
              <div className="border-b border-sky-700 text-lg sm:text-xl self-end"><span className={`text-sky-800 transition ease-in-out duration-200 ${info.isShown ? 'blur-none' : 'blur'}`}>{info.card.backSide}</span></div>
            </div>

            <button onClick={() => handleShowIndividual(info)}
              className="flex self-start justify-center items-center p-1
              size-8 ml-2
              rounded 
              bg-sky-200 shadow
              hover:bg-sky-300">
              {info.isShown ?
                <Image src={'/eye.svg'} alt="open" width={25} height={25} className="" /> :
                <Image src={'/eye-closed.svg'} alt="hidden" width={25} height={25} className="" />}
            </button>
          </div>
        })}
      </div>
    </>
  );
}
