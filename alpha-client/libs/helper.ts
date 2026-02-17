export const convertToStripeAmount = (amount: number, currency: string): number => {
    // For currencies that have 2 decimal places (e.g., USD, EUR), multiply by 100
    if (['usd', 'eur', 'inr'].includes(currency.toLowerCase())) {
        return Math.round(amount * 100);
    }
    // For other currencies, return the amount as is (assuming it's already in the smallest unit)
    return amount;
}
