'use server'

import {getSetInfo} from '@/utils/load-set-info';
import { CardSet } from '@/utils/types';

export async function loadInitialSetInfo(setId: number): Promise<CardSet> {
    console.log("Running on server");
    return getSetInfo(setId);
}