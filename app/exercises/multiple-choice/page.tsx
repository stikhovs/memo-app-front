'use client'

import { getCardSetsByIds } from "@/app/actions/get-sets-by-ids-action";
import MultipleChoiceAnswer from "@/components/multiple-choice-answer";
import { Answer, Card, QAndA } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function MultipleChoice() {
    const searchParams = useSearchParams();
    const selectedSetsIdsJson = searchParams.get('selectedSets');
    const selectedSetsIds: number[] = selectedSetsIdsJson ? JSON.parse(selectedSetsIdsJson) : [];

    const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
    const [cards, setCards] = useState<Card[]>([]);
    const [activeQuestion, setActiveQuestion] = useState<QAndA>();
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [revealCorrectAnswer, setRevealCorrectAnswer] = useState(false);
    const [showContinueBtn, setShowContinueBtn] = useState(false);

    const genQ = (): QAndA => {
        console.log(`activeIndex: ${activeIndex}`);
        console.log(`cards[activeIndex]: ${cards[activeIndex]}`);
        return { question: cards[activeIndex].frontSide, answers: genA() }
    }

    const genA = (): Answer[] => {
        return shuffle(
            [{ answer: cards[activeIndex].backSide, correct: true }]
                .concat(
                    getIncorrectAnswers(activeIndex, cards.length > 3 ? 3 : cards.length - 1)
                ));
    }

    const shuffle = (answers: Answer[]): Answer[] => {
        const shuffled = [...answers];
        shuffled.sort(() => Math.random() - 0.5);
        return shuffled;
    };

    const getIncorrectAnswers = (skipIndex: number, numberOfAnswers: number): Answer[] => {
        const result: Answer[] = [];

        const shuffled = [...cards.filter((card, index) => index !== skipIndex)];
        shuffled.sort(() => Math.random() - 0.5);
        for (let index = 0; index < numberOfAnswers; index++) {
            const card = shuffled[index];
            result.push({ answer: card.backSide, correct: false });
        }

        return result;
    }

    const next = (timeout: number) => {
        if (activeIndex < cards.length - 1) {
            setTimeout(() => {
                setRevealCorrectAnswer(false);
                setActiveIndex(activeIndex + 1);
            }, timeout);
        }
    }


    useEffect(() => {
        if (cards.length > 0) {
            setActiveQuestion(genQ());
            setShowContinueBtn(false);
        }
    }, [activeIndex]);

    useEffect(() => {
        getCardSetsByIds(selectedSetsIds)
            .then(it => {
                setSelectedTitles(it.map(set => set.title));
                setCards(it.flatMap(set => set.cards));
            });
    }, []);

    useEffect(() => {
        if (cards.length > 0) {
            console.log(`cards HERE [\n${cards.map(c => `${c.id}: ${c.frontSide} - ${c.backSide}`).join(';\n')}] `);
            setActiveQuestion(genQ());
        }
    }, [cards]);

    const handleAnswerSelection = (isCorrect: boolean) => {
        if (!isCorrect) {
            setRevealCorrectAnswer(true);
            setShowContinueBtn(true);
        }
    };

    return (
        <>
            <div className="mb-4">
                {
                    selectedTitles.length > 1 ?
                        <h2 className="text-3xl text-sky-700 self-end">Selected: {selectedTitles.join()}</h2> :
                        <h2 className="text-3xl text-sky-700 self-end">{selectedTitles[0]}</h2>
                }
            </div>
            <div className="flex justify-center items-center mb-4 w-full h-96 bg-sky-100 rounded text-3xl text-sky-800">
                <span>{activeQuestion?.question}</span>
            </div>
            <ul>
                {activeQuestion?.answers.map((answer, index) => {
                    return <li key={index}>
                        <MultipleChoiceAnswer
                            index={index}
                            currentQuestionId={activeIndex}
                            answer={answer}
                            next={next}
                            revealCorrectAnswer={revealCorrectAnswer}
                            onClick={() => handleAnswerSelection(answer.correct)}
                        />
                    </li>
                })}
            </ul>
            {
                showContinueBtn ? <button className="px-4 py-2 text-md text-sky-100 bg-sky-700 rounded hover:bg-sky-600 transition" onClick={() => next(0)}>Continue</button> : ''
            }

        </>
    );
}