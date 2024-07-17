/* Router */
import { Outlet } from "react-router-dom";
import Header from "../../components/Header"
import Container from "../../components/Container"
import Footer from "../../components/Footer"

const Base = () => {
  return (
    <>
      <Header />
      <Container>
        {/* Outlet es el marcador de posición para las rutas hijas */}
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default Base;
