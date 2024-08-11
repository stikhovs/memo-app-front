'use client'

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { exerciseCards } from '@/data/ExerciseCard';


export default function Header() {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleMenuButtonClick = () => { setIsOpen(!isOpen) }

    return (
        <>
            <header className="bg-sky-100 
          flex items-center gap-4
          px-4 py-2 ">
                <button
                    onClick={handleMenuButtonClick}
                    className={`flex flex-col justify-between items-center h-6 
                        ${isOpen ? 'z-20' : ''}
                    `}>
                    <span className={`${isOpen ? 'bg-white' : 'bg-sky-600'} block 
                h-0.5 w-7 
                transition-all duration-300 ease-out
              `}>
                    </span>
                    <span className={`${isOpen ? 'bg-white' : 'bg-sky-600'} block 
                h-0.5 w-7 
                transition-all duration-300 ease-out
              `}>
                    </span>
                    <span className={`${isOpen ? 'bg-white' : 'bg-sky-600'} block 
                h-0.5 w-7 
                transition-all duration-300 ease-out
              `}>
                    </span>
                </button>
                <Link href={'/'}><Image src={'/m_logo.svg'} alt="logo" width={200} height={100}
                    className="
                px-3
              " />
                </Link>
                <button className="
            hidden sm:block border border-sky-600 shadow-md rounded py-1 px-8 text-sky-700 text-xl
            transition ease-in-out delay-50 duration-200
            hover:bg-sky-200  hover:text-sky-800
          ">
                    Create
                </button>
                <div className="sm:grow"></div>
                {/* <Link href={'/'} className="hidden sm:block rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="0.6"
              className="stroke-sky-600 fill-transparent hover:fill-red-400 size-16">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </Link> */}

                <Link href={'/'}
                    className="hidden sm:block border-2 border-sky-600 rounded-full size-14 justify-self-end block
            transition ease-in-out delay-50 duration-200
            ">
                    <Image src={'/user-svgrepo-com.svg'} alt="user-profile" width={100} height={100}
                        className="p-1" />
                </Link>
            </header>
            <menu className={`
                    fixed top-0 left-0 
                    h-full w-64 
                    bg-sky-600
                    px-6 pt-20 text-white
                    divide-y divide-slate-200
                    transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}>
                <li className="">
                    <Link
                        href={'/#'}
                        className="
                            block py-2 px-1
                            transition ease-in-out delay-50 duration-200
                            hover:bg-sky-700
                            ">
                        Create set
                    </Link>
                </li>
                {
                    exerciseCards.map((card) => {
                        return <li key={card.title} className="">
                            <Link
                                href={card.link}
                                className="
                                    block py-2 px-1
                                    transition ease-in-out delay-50 duration-200
                                    hover:bg-sky-700
                                ">
                                {card.title}
                            </Link>
                        </li>
                    })
                }
            </menu>
        </>
    );
}