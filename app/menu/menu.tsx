import { useNavigate } from "react-router";

export default function Menu() {
  let navigate = useNavigate();

  const exit = () => {
    console.log("Exiting...");
  };

  const view = () => {
    console.log("To view pasta..");
  };

  const timer = () => {
    console.log("To set timer...");
    navigate("/timer", { state: { time: 0.2, type: "Penne" } });
  };
  return <>
    <div className="centered vbox">
      <h1 className="title">Al Dente</h1>
      <div className="vbox">
        <button className="menu-button" onClick={timer}> Start cooking </button>
        <button className="menu-button" onClick={view}> View pastas </button>
        <button className="menu-button" onClick={exit}> Quit </button>
      </div>
    </div>
  </>
}