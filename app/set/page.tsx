import { getCardSets } from "@/utils/load-sets";
import Link from "next/link";

export default async function SetPage() {

    const sets = await getCardSets();

    return (
        <>
            <h3 className='border-l-8 border-sky-600 rounded-r-lg text-xl md:text-2xl text-sky-700 bg-white p-1 mb-3'>
                Sets
            </h3>

            <ul className='grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4 xl:gap-10'>
                {sets.map(card => {
                    return <li
                        className="min-h-24 md:min-h-40 shadow-md bg-sky-100 text-center"
                        key={card.id}>
                        <Link className="
                flex w-full h-full items-center justify-center p-1
                text-xl md:text-2xl text-sky-700
                transition ease-in-out delay-50 duration-200
                hover:bg-sky-200  hover:text-sky-800"
                            href={`/set/${card.id}`}>
                            {card.title}
                        </Link>
                    </li>
                })}
            </ul>
        </>
    );
}