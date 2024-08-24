import ExerciseBlockWithModal from '@/components/exercise-block-with-modal';
import SetBlock from '@/components/set-block';
import { getCardSetsBasicInfo } from './actions/get-sets-basic-info';

export default async function Home() {

  const sets = getCardSetsBasicInfo()

  return (
    <>
      <div className='mb-6'>
        <ExerciseBlockWithModal sets={await sets}/>
      </div>
      <div>
        <SetBlock sets={await sets}/>
      </div>

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
