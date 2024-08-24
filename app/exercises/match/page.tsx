'use client'

import { useSearchParams } from "next/navigation";



export default function MatchExercisePage() {
    const searchParams = useSearchParams();
    const selectedSetsIdsJson = searchParams.get('selectedSets');
    const selectedSetsIds: number[] = selectedSetsIdsJson ? JSON.parse(selectedSetsIdsJson) : [];

    return(
        <>
            
        </>
    );
}