export const usePriceCalculator = () => {
    const priceCalculator = (cost, expense) => {
        const result = 1.5169194 * (cost + expense);
        return result.toFixed(2);
    }

    return { priceCalculator }
    // 1.3 * (cost + expense) / 0.857 = 1.3/0.857 * (cost + expense)
    // = 1.5169194 * (cost + expense)
}