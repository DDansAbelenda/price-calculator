/* Router */
import { Outlet } from "react-router-dom";
import Header from "../../components/Header"
import Container from "../../components/Container"
import Footer from "../../components/Footer"

const Base = () => {
  return (
    <main>
      <Header />
      <Container>
        {/* Outlet es el marcador de posición para las rutas hijas */}
        <Outlet />
      </Container>
      <Footer />
    </main>
  );
};

export default Base;
