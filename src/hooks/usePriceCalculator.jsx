export const usePriceCalculator = () => {
    const finalPriceCalculator = (salePercent, saleMargin, cost, expense) => {
        //Precio Calculado
        const numerator = Number((1 + saleMargin) * (cost + expense));
        const denominator = (1 - salePercent - saleMargin * salePercent);
        if (denominator === 0) return 0;
        const finalPrice = Number(numerator) / Number(denominator);

        //% De la venta salePercent
        const salePercentValue = Number(salePercent * finalPrice);

        //% Margen de Ganancia % = saleMargin * (cost + expense + salePercent * finalPrice)
        const factor1 = Number(cost + expense + salePercentValue);
        const gainMargin = Number(saleMargin) * factor1

        //Parse
        const salePercentValueParse = salePercentValue.toFixed(4);
        const gainMarginParse = gainMargin.toFixed(4)
        const finalPriceParse = finalPrice.toFixed(2)

        return { finalPriceParse, gainMarginParse, salePercentValueParse };
    }
    const difference = (finalPrice, maximumPrice) => {
        // Diferencia enter el precio tope y precio venta
        let difference = Number(maximumPrice) - Number(finalPrice);
        return difference.toFixed(4);

    }
    const proposePriceCalculator = (salePercent, saleMargin, maximumPrice, expense) => {
        const numerator = Number(maximumPrice * Number(1 - salePercent - Number(saleMargin * salePercent)));
        const denominator = 1 + saleMargin;
        if (denominator === 0) return 0;
        const maximumAllowableCost = Number((numerator / denominator)) - expense;
        return maximumAllowableCost.toFixed(4);
    }

    return { finalPriceCalculator, difference, proposePriceCalculator }
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