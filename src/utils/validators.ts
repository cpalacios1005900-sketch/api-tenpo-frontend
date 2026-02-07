// utils/validators.ts
export function isValidAmount(amount: number) {
    return amount >= 0;
}


export function isValidDate(date: string) {
    return new Date(date) <= new Date();
}