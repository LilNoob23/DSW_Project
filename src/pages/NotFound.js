import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ width: "100%" }}>
      <h1>No se encontro una pagina :(</h1>
      <Link to="/dashboard/profile">Ir a mi perfil</Link>
    </div>
  );
}

export default NotFound;
