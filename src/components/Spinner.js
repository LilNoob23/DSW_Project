import "./styles/Spinner.css";
function Spinner() {
  return (
    <div className="spinner_container">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h2>Cargando...</h2>
    </div>
  );
}

export default Spinner;
