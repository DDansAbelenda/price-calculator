//import { useLocation } from "react-router-dom";
//import NavLink from "../NavLink";
import "./header.css";
import logo from "./logo.png";
//import { useContext } from "react";
//import { GlobalContext } from "../../context/GlobalContext";

const Header = () => {

  //const location = useLocation(); // ruta en la que se encuentra

  //const { state } = useContext(GlobalContext);
  // const { serverNotification } = state;

  return (
    <header className="header-container-black">
      <div className="logo-container-black">
        <img src={logo} alt="Logo de Calculadora con un Eslabon" className="logo-img" />
        <span className="logo-title">CALCULADORA DE PRECIOS ESLABON</span>
      </div>
    </header>
  );
};

export default Header;

/*


      <section className="buttons-container-nav">
        <NavLink
          buttonText={"HOME"}
          url={"/"}
          isActive={location.pathname === "/"}
        />
        <NavLink
          buttonText={"NUEVO VIDEO"}
          url={"/new-video"}
          isActive={location.pathname === "/new-video"}
          disabled={serverNotification.error}
        />
      </section>

*/