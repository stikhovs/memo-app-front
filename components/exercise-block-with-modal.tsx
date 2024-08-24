'use client'

import React, { useState } from "react";
import Link from 'next/link';
import { exerciseCards } from '@/data/ExerciseCard';
import { CardSetBasicInfo } from "@/utils/types";
import ExerciseModalBlock from "./exercise-modal-block";


export default function ExerciseBlockWithModal({ sets }: { sets: CardSetBasicInfo[] }) {

    const [showExerciseModal, setShowExerciseModal] = useState<boolean>(false);
    const [chosenExersiceTitle, setChosenExerciseTitle] = useState<string>();

    return (
        <>
            <h3 className='border-l-8 border-sky-600 rounded-r-lg text-xl md:text-2xl text-sky-700 bg-white p-1 mb-3'>
                Exercises
            </h3>

            <ul className='grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4 xl:gap-10'>
                {exerciseCards.map(card => {
                    return <li
                        className="min-h-24 md:min-h-40 shadow-md bg-sky-100 text-center"
                        key={card.title}>
                        <button className="
                flex w-full h-full items-center justify-center p-1
                text-xl md:text-2xl text-sky-700
                transition ease-in-out delay-50 duration-200
                hover:bg-sky-200  hover:text-sky-800"
                            onClick={() => {
                                setChosenExerciseTitle(card.title);
                                setShowExerciseModal(true);
                            }}>
                            {card.title}
                        </button>
                    </li>
                })}
            </ul>
            <div className='flex justify-end mt-2 sm:mt-4'>
                <Link href={'/#'}
                    className='
              py-2 px-6 sm:max-md:px-4 
              rounded 
              bg-sky-600 shadow-md text-sky-100 text-base
              transition ease-in-out delay-50 duration-200
              hover:bg-sky-500'>
                    View all
                </Link>
            </div>
            {showExerciseModal && <ExerciseModalBlock setIsShowExerciseModal={setShowExerciseModal} sets={sets}>{chosenExersiceTitle!}</ExerciseModalBlock>}
        </>
    );
}