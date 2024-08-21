'use client'

import { Card, CardSet } from "@/utils/types";
import { loadInitialSetInfo } from '@/app/actions/get-set-info-action';
import { useEffect, useState } from 'react';
import Image from "next/image";
import updateSet from "@/app/actions/update-set-action";
import CSS from "csstype";
import { useSearchParams } from "next/navigation";
import { getCardSetsByIds } from "@/app/actions/get-sets-by-ids-action";

type Props = {
    params: {
        slug: number;
    };
};

export default function FlashcardsPage() {
    //const [cardSet, setCardSet] = useState<CardSet>();
    const [cards, setCards] = useState<Card[]>([]);
    const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
    const [activeCard, setActiveCard] = useState<Card>();
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isFlipped, setIsFlipped] = useState(false);
    
    const searchParams = useSearchParams();
    const selectedSetsIdsJson = searchParams.get('selectedSets');
    const selectedSetsIds: number[] = selectedSetsIdsJson ? JSON.parse(selectedSetsIdsJson) : [];

    const cardStyle: CSS.Properties = {
        transformStyle: "preserve-3d",
        transition: "all 0.5s ease"
    }

    const sideStyle: CSS.Properties = {
        backfaceVisibility: "hidden"
    }

    const rotateStyle: CSS.Properties = {
        transform: "rotateY(180deg)"
    }

    useEffect(() => {
        getCardSetsByIds(selectedSetsIds)
            .then(it => {
                setSelectedTitles(it.map(set => set.title));
                setCards(it.flatMap(set => set.cards));
            })
            .then(() => {
                setActiveCard(cards[activeIndex])
            })
        /* loadInitialSetInfo(params.slug)
            .then(it => {
                setCardSet(it);
                setActiveCard(it.cards[activeIndex])
            }) */
    }, []);

    useEffect(() => {setActiveCard(cards[activeIndex])}, [cards]);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const previous = () => {
        let newActiveIndex: number;
        if (activeIndex - 1 < 0) {
            newActiveIndex = 0;
        } else {
            newActiveIndex = activeIndex - 1;
        }
        setActiveIndex(newActiveIndex);
        setActiveCard(cards[newActiveIndex])
    }

    const next = () => {
        let newActiveIndex: number;
        if (activeIndex + 1 > cards.length - 1) {
            newActiveIndex = cards.length - 1;
        } else {
            newActiveIndex = activeIndex + 1;
        }
        setActiveIndex(newActiveIndex);
        setActiveCard(cards[newActiveIndex])
    }

    const handleUpDownKeys = (event: KeyboardEvent) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            handleFlip();
        }
    };

    const handleLeftRightKeys = (event: KeyboardEvent) => {
        if (event.key === 'ArrowLeft') {
            previous();
        }
        if (event.key === 'ArrowRight') {
            next();
        }
    };

    useEffect(() => {
        // Добавляем обработчик событий клавиатуры
        window.addEventListener('keydown', handleUpDownKeys);

        // Удаляем обработчик событий при размонтировании компонента
        return () => {
            window.removeEventListener('keydown', handleUpDownKeys);
        };
    }, [isFlipped]);

    useEffect(() => {
        // Добавляем обработчик событий клавиатуры
        window.addEventListener('keydown', handleLeftRightKeys);

        // Удаляем обработчик событий при размонтировании компонента
        return () => {
            window.removeEventListener('keydown', handleLeftRightKeys);
        };
    }, [activeCard]);


    return (
        <>
            <div className="ml-4 flex justify-between mb-3">
                <h2 className="text-3xl text-sky-700 self-end">Selected: {selectedTitles.join()}</h2>
            </div>
            <div className="flex justify-center items-center">

                <div className="relative h-96 w-96">
                    <div className={`absolute  w-full h-full`} style={isFlipped ? { ...cardStyle, ...{ transform: 'rotateX(180deg)' } } : { ...cardStyle }}>

                        <div className={`absolute w-full h-full flex justify-center items-center rounded-xl shadow-md`} style={sideStyle}>
                            <span className="text-3xl">{activeCard?.frontSide}</span>
                        </div>

                        <div className={`absolute w-full h-full flex justify-center items-center rounded-xl shadow-md`} style={{ ...sideStyle, ...{ transform: 'rotateX(180deg)' } }}>
                            <span className="text-3xl">{activeCard?.backSide}</span>
                        </div>
                    </div>
                </div>
            </div>
            <button
                className="mt-6 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                onClick={handleFlip}
            >
                Flip Card
            </button>
            <div className="my-6 flex justify-between">
                <button
                    className="px-4 py-2 border border-sky-700 rounded hover:bg-sky-600 transition"
                    onClick={previous}
                >
                    Left
                </button>
                <button className="px-4 py-2 border border-sky-700 rounded hover:bg-sky-600 transition"
                    onClick={next}
                >
                    Right
                </button>
            </div>
        </>
    );
}
