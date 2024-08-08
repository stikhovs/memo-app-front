'use client'

import { CardSet, Card } from '@/utils/types';
import { loadInitialSetInfo } from '@/app/actions/get-set-info-action';
import { useEffect, useState } from 'react';

enum CurrentlyShow {
    FRONT_SIDE, BACK_SIDE
}

export default function Flashcards() {

    const [cardsArr, setCardsArr] = useState<Card[]>([]);
    const [selected, setSelected] = useState<Card>();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentlyShow, setCurrentlyShow] = useState<CurrentlyShow>(CurrentlyShow.FRONT_SIDE);

    useEffect(() => {
        loadInitialSetInfo(7)
            .then(res => {
                setCardsArr(res.cards);
                setSelected(res.cards[0]);
                setCurrentIndex(0);
            });
    }, []);

    useEffect(() => {
        setCurrentlyShow(CurrentlyShow.FRONT_SIDE);
    }, [selected]);

    useEffect(() => {
        setSelected(cardsArr[currentIndex]);
    }, [currentIndex]);

    const flip = () => currentlyShow == CurrentlyShow.FRONT_SIDE ? setCurrentlyShow(CurrentlyShow.BACK_SIDE) : setCurrentlyShow(CurrentlyShow.FRONT_SIDE);
    
    const next = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % cardsArr.length);
      
    const previous = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + cardsArr.length) % cardsArr.length);


    return (
        <>
            <h1 className='pb-4'>Flashcards</h1>
            <div><p>{currentlyShow == CurrentlyShow.FRONT_SIDE ? selected?.frontSide : selected?.backSide}</p></div>
            <button onClick={flip}>Flip</button>
            <button onClick={next}>Next</button>
            <button onClick={previous}>Previous</button>
            <div>
                <ul>
                    {cardsArr.map(card => {
                        return <li key={card.id}>{card.id}</li>
                    })}
                </ul>
            </div>
        </>
    );
}