import { useNavigate, useLocation } from "react-router";
import type { Pasta } from "types/pasta";


export default function ViewPasta() {
  let navigate = useNavigate();
  const location = useLocation();
  const pasta = location.state?.pastaItem;

  const backToGallery = () => {
    console.log("To gallery...");
    navigate("/gallery");
  };

  const setTimer = () => {
    console.log("To set timer for ", pasta.cookTime);
    navigate("/timer/running", { state: { time: pasta.cookTime} });
  };

  const toEditPasta = () => {
    console.log("To edit pasta...");
    navigate("/edit", { state: { pasta: pasta } });
  }

  return <>
    <div className="centered tight vbox">
      <div className="topbar">
        <div></div>
        <h2>{pasta.name}</h2>
        <button className="small-btn dark-btn" onClick={toEditPasta}>Edit</button>
      </div>
      <div className="left-align tight vbox">
        <p className="left-align description">{pasta.description}</p>
        <p className="left-align">
          Cook time: {pasta.cookTime} minutes
        </p>
      </div>
      <p className="large-text">{pasta.cookTime} minutes</p>
      <button className="menu-btn dark-btn" onClick={setTimer}>Start timer</button>
      <button className="menu-btn dark-btn" onClick={backToGallery}>Back</button>
    </div>
  
  </>

}