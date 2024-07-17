import "./home.css";
import { useState } from "react";
import { usePriceCalculator } from "../../hooks/usePriceCalculator";
import Field from "../../components/Field";
//import Popup from "../../components/Popup";
import Button from "../../components/Button";


const Home = () => {
  const [product, setProduct] = useState("");
  const [cost, setCost] = useState("");
  const [expense, setExpense] = useState("");
  const [result, setResult] = useState("");
  //const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { priceCalculator } = usePriceCalculator();

  const submit = (e) => {
    e.preventDefault()
    setResult(priceCalculator(Number(cost), Number(expense)));
    //setIsPopupOpen(true);
  }

  const reset = (e) => {
    e.preventDefault();
    setProduct("");
    setCost("");
    setExpense("");
    setResult("");
  }

  /*const closePopup = () => {
    setIsPopupOpen(false);
  };*/

  return (
    <section className="home-container">
      <div className="form-calculator-container">
        <h1>Calculadora</h1>
        <form onSubmit={submit}>
          <Field
            type="text"
            id={"product"}
            name={"product"}
            value={product}
            title="Producto"
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Indica el nombre ..."
            required={false}
          />
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
            id="result"
            name="result"
            value={result}
            title="Precio de venta"
            placeholder="$ 0.00"
            required={false}
            readOnly={true}
          />
        </form>
      </div>

      {/*isPopupOpen &&
        <Popup
          message={`El precio de venta sugerido para el producto ${product} es de $${result}`}
          closePopup={closePopup}
        />*/}

    </section>
  );
};

export default Home;
