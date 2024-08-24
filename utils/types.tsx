export type CardSet = {
    id: number | null,
    title: string,
    uuid: string | null,
    cards: Card[]
}

export type CardSetBasicInfo = {
    id: number,
    title: string
}

export type Card = {
    id: number | null,
    frontSide: string,
    backSide: string
}


export interface QAndA {
    question: string,
    answers: Answer[]
}

export interface Answer {
    answer: string,
    correct: boolean
}