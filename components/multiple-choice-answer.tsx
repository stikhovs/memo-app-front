'use client'

import { Answer } from "@/utils/types";
import { useEffect, useState } from "react";

interface Props {
    index: number;
    currentQuestionId: number;
    answer: Answer;
    next: (timeout: number) => void;
    revealCorrectAnswer: boolean;
    onClick: () => void;
}

enum BorderState {
    HIDDEN = 'border-transparent',
    CORRECT = 'border-green-500',
    CORRECT_WAS = 'border-dashed border-green-500',
    INCORRECT = 'border-red-500'
}

const TIMEOUT_IN_MILLSECONDS = 2000;

export default function MultipleChoiceAnswer({ index, currentQuestionId, answer, next, revealCorrectAnswer, onClick }: Props) {

    const [isChosen, setIsChosen] = useState<boolean>(false);
    const [answerStyle, setAnswerStyle] = useState<BorderState>(BorderState.HIDDEN);

    useEffect(() => {
        setIsChosen(false);
        setAnswerStyle(BorderState.HIDDEN);
    }, [currentQuestionId]);

    useEffect(() => {
        if (isChosen) {
            if (answer.correct) {
                setAnswerStyle(BorderState.CORRECT);
                next(TIMEOUT_IN_MILLSECONDS);
            } else {
                setAnswerStyle(BorderState.INCORRECT);
            }
        } else if (revealCorrectAnswer && answer.correct) {
            // Если выбран неправильный ответ, подсвечиваем правильный ответ
            setAnswerStyle(BorderState.CORRECT_WAS);
        } else if (!revealCorrectAnswer) {
            setAnswerStyle(BorderState.HIDDEN);
        }
    }, [isChosen, revealCorrectAnswer]);

    return (
        <>
            <div className={`flex border ${answerStyle} mb-2 pl-2 bg-sky-100 transition hover:bg-sky-200`} onClick={onClick}>
                <input className="cursor-pointer" id={index.toString()} type="radio" onChange={() => setIsChosen(!isChosen)} checked={isChosen} />
                <label htmlFor={index.toString()} className="pl-2 py-2 w-full cursor-pointer text-lg text-sky-800">
                    {answer.answer}
                </label>
            </div>
        </>
    );
}