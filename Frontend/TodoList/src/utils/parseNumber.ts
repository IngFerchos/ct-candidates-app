import { notLowZero } from "./notLowZero"

export const parseNumber = (num: string) => {
    const parse = Number(num)
    return notLowZero(parse)
}