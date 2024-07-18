export const usePriceCalculator = () => {
    const finalPriceCalculator = (salePercent, saleMargin, cost, expense) => {
        const numerator = Number((1 + saleMargin) * (cost + expense));
        const denominator = (1 - salePercent - saleMargin * salePercent);
        if (denominator === 0) return 0;
        const finalSale = Number(numerator) / Number(denominator);
        return finalSale.toFixed(2);
    }
    const differencePercent = (finalPrice, maximumPrice) => {
        // Diferencia enter el precio tope y precio venta
        const difference = Math.abs(maximumPrice - finalPrice);
        // Calculando la media de los dos valores a+b/4
        const average = Number(((Number(maximumPrice) + Number(finalPrice)) / 4));
        //Calculando el % de diferencia
        let differencePercentValue = (difference / average) * 100;
        if (isNaN(differencePercentValue)) differencePercentValue = 0;
        if (Number(finalPrice) > Number(maximumPrice)) return -differencePercentValue.toFixed(4);
        return differencePercentValue.toFixed(4);

    }
    const proposePriceCalculator = (salePercent, saleMargin, maximumPrice, expense) => {
        const numerator = Number(maximumPrice * Number(1 - salePercent - Number(saleMargin * salePercent)));
        const denominator = 1 + saleMargin;
        if (denominator === 0) return 0;
        const maximumAllowableCost = Number((numerator / denominator)) - expense;
        return maximumAllowableCost.toFixed(4);
    }

    return { finalPriceCalculator, differencePercent, proposePriceCalculator }
    // venta = 1.3 * (cost + expense) / 0.857 = 1.3/0.857 * (cost + expense)
    // = 1.5169194 * (cost + expense)
}

/*
¿Cuál es la diferencia porcentual entre 20 y 30?
Calcula la diferencia absoluta entre los números: |20 - 30| = |-10| = 10 ;
Calcula también su media: (20 + 30) / 2 = 50 / 2 = 25 ;
Divide la diferencia por la media: 10 / 25 = 0.4 ; y.
Expresa el resultado en porcentaje: 0.4 × 100 = 40 % .
*/