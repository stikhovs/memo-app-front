import Link from 'next/link';
import { getCardSets } from '@/utils/load-sets';
import {exerciseCards} from '@/data/ExerciseCard';


export default async function Home() {
  const cardSets = await getCardSets();

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
            <Link className="
                flex w-full h-full items-center justify-center p-1
                text-xl md:text-2xl text-sky-700
                transition ease-in-out delay-50 duration-200
                hover:bg-sky-200  hover:text-sky-800"
              href={card.link}>
              {card.title}
            </Link>
          </li>
        })}
      </ul>

      {/* <div>
        <Link href={`/flashcards`}>flashcards</Link>
        {cardSets.map(it => {
          return <div key={it.id}>
            <Link href={`/set/${it.id}`} >{it.title}</Link>
          </div>
        })}
      </div> */}
    </>
  );
}
