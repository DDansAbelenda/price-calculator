export const usePriceCalculator = () => {
    const priceCalculator = (salePercent, saleMargin, cost, expense) => {
        const numerator = (1 + saleMargin) * (cost + expense);
        const denominator = (1 - salePercent - saleMargin * salePercent);
        const finalSale = Number(numerator) / Number(denominator);
        return finalSale.toFixed(2);
    }

    return { priceCalculator }
    // 1.3 * (cost + expense) / 0.857 = 1.3/0.857 * (cost + expense)
    // = 1.5169194 * (cost + expense)
}