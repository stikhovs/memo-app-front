import Link from 'next/link';
import { getCardSets, CardSet } from '@/utils/load-sets';


export default async function Home() {
  const cardSets = await getCardSets();

  return (
    <>
      <nav><Link href={`/flashcards`}>flashcards</Link></nav>
      {cardSets.map(it => {
        return <div key={it.id}>
          <Link href={`/set/${it.id}`} >{it.title}</Link>
        </div>
      })}
    </>
  );
}
