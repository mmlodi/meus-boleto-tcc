import "./index.css";

export default function Header({ setLogin }) {
  function backToWelcomePage() {
    setLogin(false);
  }
  return (
    <>
      <header className="headerContainer">
        <img src="" alt="Logo" />
        <button className="btn" onClick={() => backToWelcomePage()}>
          Inicio
        </button>
      </header>
    </>
  );
}