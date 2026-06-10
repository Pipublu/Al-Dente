import { useNavigate } from "react-router";

export default function Menu() {
  let navigate = useNavigate();

  const exit = () => {
    console.log("Exiting...");
  };

  const view = () => {
    console.log("To view pasta..");
    navigate("/gallery");
  };

  return <>
    <div className="vbox">
      <h1 className="title">Al Dente</h1>
      <div className="vbox">
        <div className="v-spacer"></div>
        <button className="menu-button" onClick={view}> Start cooking </button>
        <button className="menu-button" onClick={exit}> Quit </button>
      </div>
    </div>
  </>
}