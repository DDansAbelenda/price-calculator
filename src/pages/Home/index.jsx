import "./home.css";
import { useState } from "react";
import { usePriceCalculator } from "../../hooks/usePriceCalculator";
import Field from "../../components/Field";
import Popup from "../../components/Popup";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";

const Home = () => {
  //const [product, setProduct] = useState("");
  const { finalPriceCalculator, difference, proposePriceCalculator } = usePriceCalculator();

  //Estado de los campos del formulario
  const [cost, setCost] = useState("");
  const [expense, setExpense] = useState("");
  const [salePercent, setSalePercent] = useState("11");
  const [salePercentValue, setSalePercentValue] = useState("");
  const [saleMargin, setSaleMargin] = useState("30");
  const [gainMargin, setGainMargin] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [maximumPrice, setMaximumPrice] = useState("");
  const [differenceResult, setDifferenceResult] = useState("");
  const [maximumAllowableCost, setMaximumAllowableCost] = useState("");
  //Estado del mensaje de error
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  //Estado para controlar si mostrar o no el resto de campos 
  const [isMaximumPriceOptionSelected, setMaximumPriceOptionSelected] = useState(false);
  const [isDifferenceNegative, setDifferenceNegative] = useState(false);
  const [isPercentFieldsVisible, setPercentFieldsVisible] = useState(false);

  // Obtiene, actualiza y retorna el precio de venta
  const getFinalPrice = () => {
    //Validaciones
    let salePercentValue;
    isNaN(salePercent) ? salePercentValue = 0 : salePercentValue = Number(salePercent) / 100;
    let saleMarginValue;
    isNaN(saleMargin) ? saleMarginValue = 0 : saleMarginValue = Number(saleMargin) / 100;
    if (saleMarginValue < 0 || saleMarginValue > 1) {
      throw new Error("El % de margen de venta debe ser un número entre 0 y 100")
    } else if (salePercentValue < 0 || salePercentValue > 1) {
      throw new Error("El % de impuesto a la venta debe ser un número entre 0 y 100")
    } else {
      let costValue;
      isNaN(cost) ? costValue = 0 : costValue = Number(cost);
      let expenseValue;
      isNaN(expense) ? expenseValue = 0 : expenseValue = Number(expense);
      const { finalPriceParse, gainMarginParse, salePercentValueParse } = finalPriceCalculator(salePercentValue, saleMarginValue, costValue, expenseValue);
      setFinalPrice(finalPriceParse);
      setGainMargin(gainMarginParse);
      setSalePercentValue(salePercentValueParse);
      return finalPriceParse;
    }
  }

  // Obtiene, actualiza y retorna el % de diferencia entre el tope y el precio venta
  const getDifference = () => {
    let maximumPriceParse;
    isNaN(maximumPrice) ? maximumPriceParse = 0 : maximumPriceParse = Number(maximumPrice)
    const finalPriceValue = getFinalPrice();
    const differenceValue = difference(Number(finalPriceValue), maximumPriceParse);
    console.log(`Diferencia desde getDifference ${differenceValue}`);
    setDifferenceResult(`${differenceValue}`);
    return Number(differenceValue);
  }

  // Obtiene y actualiza el costo máximo permitido
  const getMaximumAllowCost = () => {
    //Validando entradas
    let maximumPriceParse;
    isNaN(maximumPrice) ? maximumPriceParse = 0 : maximumPriceParse = Number(maximumPrice)
    let saleMarginValue;
    isNaN(saleMargin) ? saleMarginValue = 0 : saleMarginValue = Number(saleMargin) / 100;
    let salePercentValue;
    isNaN(salePercent) ? salePercentValue = 0 : salePercentValue = Number(salePercent) / 100;
    let expenseValue;
    isNaN(expense) ? expenseValue = 0 : expenseValue = Number(expense);

    const allowCost = proposePriceCalculator(
      salePercentValue,
      saleMarginValue,
      maximumPriceParse,
      expenseValue
    );
    setMaximumAllowableCost(`${allowCost}`);
    setDifferenceNegative(true);
  }

  const submit = (e) => {
    e.preventDefault()
    try {
      getFinalPrice();
      if (isMaximumPriceOptionSelected) {
        const difference = getDifference();
        if (difference < 0) {
          getMaximumAllowCost();
        } else {
          setMaximumAllowableCost("");
          setDifferenceNegative(false);
        }
      }
    } catch (error) {
      setMessage(
        {
          text: error.message,
          type: "error"
        }
      )
      setIsPopupOpen(true);
    }
  }

  const reset = (e) => {
    e.preventDefault();
    //setProduct("");
    setCost("");
    setExpense("");
    setFinalPrice("");
    setSalePercent("11");
    setSaleMargin("30");
    setDifferenceResult("");
    setMaximumPrice("")
    setDifferenceNegative(false);
    setMaximumAllowableCost("");
    setGainMargin("");
    setSalePercentValue("");
  }

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <section className="home-container">
      <div className="form-calculator-container">
        <h1>Calculadora</h1>
        <form onSubmit={submit}>
          <Field
            type="number"
            id={"price"}
            name={"price"}
            value={cost}
            title="Precio de costo"
            onChange={(e) => setCost(e.target.value)}
            placeholder="$ 0.00"
            required={false}
          />
          <Field
            type="number"
            id={"expense"}
            name={"expense"}
            value={expense}
            title="Gastos"
            onChange={(e) => setExpense(e.target.value)}
            placeholder="$ 0.00"
            required={false}
          />
          {isPercentFieldsVisible &&
            <>
              <Field
                type="number"
                id={"salePercent"}
                name={"salePercent"}
                value={salePercent}
                title=" % Impuesto a la venta"
                onChange={(e) => setSalePercent(e.target.value)}
                placeholder="Número entre 0-100"
                required={false}
              />
              <Field
                type="number"
                id={"saleMargin"}
                name={"saleMargin"}
                value={saleMargin}
                title=" % Margen de ganancia"
                onChange={(e) => setSaleMargin(e.target.value)}
                placeholder="Número entre 0-100"
                required={false}
              />
            </>
          }
          {isMaximumPriceOptionSelected &&
            <>
              <Field
                type="number"
                id="maximumPrice"
                name="maximumPrice"
                value={maximumPrice}
                title="Precio topado"
                onChange={(e) => setMaximumPrice(e.target.value)}
                placeholder="$ 0.00"
                required={false}
              />
            </>
          }
          <Checkbox
            id="maximumPriceOption"
            name="maximumPriceOption"
            title="Indicar precio topado"
            onChange={() => { setMaximumPriceOptionSelected(!isMaximumPriceOptionSelected) }}
            checked={isMaximumPriceOptionSelected}
          />
          <Checkbox
            id="viewPercentField"
            name="viewPercentField"
            title="Editar % de venta y margen"
            onChange={() => { setPercentFieldsVisible(!isPercentFieldsVisible) }}
            checked={isPercentFieldsVisible}
          />
          <div className="button-container">
            <Button type="submit" onClick={submit}>
              Calcular
            </Button>
            <Button onClick={reset}>
              Limpiar
            </Button>
          </div>
          {/*Resultados del precio calculado*/}
          <Field
            type="number"
            id="finalPrice"
            name="finalPrice"
            value={finalPrice}
            title="Precio de venta"
            placeholder="$ 0.00"
            readOnly={true}
          />
          <Field
            type="number"
            id="gainMargin"
            name="gainMargin"
            value={gainMargin}
            title={`Margen de ganancia al ${saleMargin}%`}
            placeholder="$ 0.00"
            readOnly={true}
          />
          <Field
            type="number"
            id="salePercentValue"
            name="salePercentValue"
            value={salePercentValue}
            title={`Impuesto de venta al ${salePercent}%`}
            placeholder="$ 0.00"
            readOnly={true}
          />
          {/* Trabajo con el precio topado */}
          {isMaximumPriceOptionSelected &&
            <Field
              type="number"
              id="differenceResult"
              name="differenceResult"
              value={differenceResult}
              title="Diferencia venta/tope"
              placeholder="% diferencia"
              readOnly={true}
              classNameInput={Number(differenceResult) >= 0 ? "positive" : "negative"}
            />
          }
          {
            isMaximumPriceOptionSelected && isDifferenceNegative &&
            <Field
              type="number"
              id="maximumAllowableCost"
              name="maximumAllowableCost"
              value={maximumAllowableCost}
              title="Sugerencia de precio de costo"
              readOnly={true}
            />
          }
        </form>
      </div >
      {isPopupOpen &&
        <Popup
          message={message.text}
          closePopup={closePopup}
          type={message.type}
        />
      }
    </section >
  );
};

export default Home;

/**
 * <Field
    type="text"
    id={"product"}
    name={"product"}
    value={product}
    title="Producto"
    onChange={(e) => setProduct(e.target.value)}
    placeholder="Indica el nombre ..."
    required={false}
  />
 * 
 */
/**

          css
          .checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.checkbox-container input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: var(--variable-collection-light-gold-hard);
}

.checkbox-container label {
  font-size: 1rem;
  color: var(--variable-collection-light-gold-hard);
  cursor: pointer;
}

.additional-fields {
  display: none;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.additional-fields.show {
  display: flex;
}

 */