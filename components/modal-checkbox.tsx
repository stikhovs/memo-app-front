'use client'

import { CardSetBasicInfo } from "@/utils/types";
import { useState } from "react";

interface Props {
    set: CardSetBasicInfo,
    checkHandler : (isChecked: boolean, id: number) => void
}

export default function ModalCheckbox({ set, checkHandler }: Props) {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const toggleChecked = () => {
        const changed = !isChecked;
        setIsChecked(changed);
        
        checkHandler(changed, set.id);
    };

    return (
        <>
            <input id={set.id!.toString()} checked={isChecked} onChange={toggleChecked} type="checkbox" className="cursor-pointer mr-2" />
            <label htmlFor={set.id!.toString()} className="w-full cursor-pointer py-2 flex justify-between items-end">
                <span className="text-lg text-sky-800">{set.title}</span>
                <span className="text-md italic text-sky-700">cards: TODO</span>
            </label>
        </>
    );
}