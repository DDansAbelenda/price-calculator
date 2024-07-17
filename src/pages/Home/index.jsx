import "./home.css";
import { useState } from "react";
import { usePriceCalculator } from "../../hooks/usePriceCalculator";
import Field from "../../components/Field";
import Popup from "../../components/Popup";
import Button from "../../components/Button";


const Home = () => {
  //const [product, setProduct] = useState("");
  //Estado de los campos del formulario
  const [cost, setCost] = useState("");
  const [expense, setExpense] = useState("");
  const [salePercent, setSalePercent] = useState("11");
  const [saleMargin, setSaleMargin] = useState("30");
  const [saleCost, setSaleCost] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { priceCalculator } = usePriceCalculator();
  const [message, setMessage] = useState({ text: "", type: "" });

  const submit = (e) => {
    e.preventDefault()
    //Validaciones
    const salePercentParse = Number(salePercent) / 100;
    const saleMarginParse = Number(saleMargin) / 100;
    if (saleMarginParse < 0 || saleMarginParse > 1) {
      setMessage(
        {
          text: "El % de margen de venta debe ser un número entre 0 y 100",
          type: "error"
        }
      )
      setIsPopupOpen(true);
    } else if (salePercentParse < 0 || salePercentParse > 1) {
      setMessage(
        {
          text: "El % de impuesto a la venta debe ser un número entre 0 y 100",
          type: "error"
        }
      )
      setIsPopupOpen(true);
    } else {
      setSaleCost(priceCalculator(
        salePercentParse,
        saleMarginParse,
        Number(cost),
        Number(expense)
      ));
    }
    //priceCalculator = (salePercent, saleMargin, cost, expense)
    //setIsPopupOpen(true);
  }

  const reset = (e) => {
    e.preventDefault();
    //setProduct("");
    setCost("");
    setExpense("");
    setSaleCost("");
    setSalePercent("11");
    setSaleMargin("30");
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
            title=" % Margen de venta"
            onChange={(e) => setSaleMargin(e.target.value)}
            placeholder="Número entre 0-100"
            required={false}
          />
          <div className="button-container">
            <Button type="submit" onClick={submit}>
              Calcular
            </Button>
            <Button type="reset" onClick={reset}>
              Limpiar
            </Button>
          </div>
          <Field
            type="number"
            id="saleCost"
            name="saleCost"
            value={saleCost}
            title="Precio de venta"
            placeholder="$ 0.00"
            required={false}
            readOnly={true}
          />
        </form>
      </div>
      {isPopupOpen &&
        <Popup
          message={message.text}
          closePopup={closePopup}
          type={message.type}
        />
      }
    </section>
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