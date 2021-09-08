import { IoMdClose } from "react-icons/io";

function ErroMessage({ setError, message }) {
  const closeError = () => setError(false);

  return (
    <div className="generalerrormessage">
      <span>{message}</span>
      <IoMdClose cursor="pointer" onClick={closeError} size="20" />
    </div>
  );
}

export default ErroMessage;
