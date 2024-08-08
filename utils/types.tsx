export type CardSet = {
    id: number,
    title: string,
    uuid: string,
    cards: Card[]
}

export type Card = {
    id: number,
    frontSide: string,
    backSide: string
}
