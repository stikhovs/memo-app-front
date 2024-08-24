'use client'

import { CardSetBasicInfo } from "@/utils/types";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import ModalCheckbox from "./modal-checkbox";

interface ModalProps {
    children: ReactNode;
    setIsShowExerciseModal: (isShowModal: boolean) => void,
    sets: CardSetBasicInfo[]
}

export default function ExerciseModalBlock(
    { setIsShowExerciseModal, sets, children }: ModalProps,
) {
    const [selected, setSelected] = useState<number[]>([]);
    const [selectedExercise, setSelectedExercise] = useState<string>();

    const updateSelected = (isChecked: boolean, id: number) => {
        isChecked ?
            setSelected([...selected, sets.filter(s => s.id === id).map(s => s.id)[0]]) :
            setSelected(selected.filter(s => s === id));
    }

    useEffect(() => {
        setSelectedExercise(children?.toString().toLowerCase().replaceAll(' ', '-'));
    }, []);

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800/75 transition" onClick={() => setIsShowExerciseModal(false)}></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded border border-gray-800 w-96 min-h-80 bg-sky-100 p-5 z-10">
                <h3 className="text-xl font-medium text-sky-800 mb-3">Choose sets for the exercise: {children}</h3>
                <div className="">
                    <ul className="divide-y divide-slate-200 max-h-96 overflow-y-auto">
                        {sets.map(set => {
                            return <li key={set.id} className="flex justify-between pr-2">
                                <ModalCheckbox set={set} checkHandler={updateSelected} />
                                {/* <input id={set.id!.toString()} onChange={(e) => e} type="checkbox" className="cursor-pointer mr-2" />
                                <label htmlFor={set.id!.toString()} className="w-full cursor-pointer py-2 flex justify-between items-end">
                                    <span className="text-lg text-sky-800">{set.title}</span>
                                    <span className="text-md italic text-sky-700">cards: TODO</span>
                                </label> */}
                            </li>
                        })}
                    </ul>
                </div>
                <Link href={{
                    pathname: `/exercises/${selectedExercise}`,
                    query: { selectedSets: JSON.stringify(selected) }
                }} >Apply</Link>
            </div>
        </>
    );
}