import { useNavigate } from "react-router";

export default function Menu() {
  let navigate = useNavigate();

  const exit = () => {
    console.log("Exiting...");
 
  };


  const view = () => {
    navigate("/gallery");
  };

  const settings = () => {
    navigate("/settings");
  }

  return <>
    <div className="centered vbox">
      <h1 className="title">Al Dente</h1>
      <div className="vbox">
        <div className="v-spacer"></div>
        <button className="menu-btn dark-btn" onClick={view}>Start cooking</button>
        <button className="menu-btn dark-btn" onClick={settings}>Manage pasta</button>
        <button className="menu-btn dark-btn" onClick={exit}>Quit</button>
      </div>
    </div>
  </>
}