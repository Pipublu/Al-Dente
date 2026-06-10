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
    console.log("To set timer...");
    navigate("/timer/running", { state: { time: pasta.cookTime.min} });
  };

  return <>
    <div className="centered tight vbox">
      <div className="topbar">
        <div></div>
        <h2>{pasta.name}</h2>
        <button className="small-btn">Edit</button>
      </div>
      <div className="left-align tight vbox">
        <p className="left-align description">{pasta.description}</p>
        <p className="left-align">
          Cook time: {pasta.cookTime.min} - {pasta.cookTime.max} minutes
        </p>
      </div>
      <p className="large-text">{pasta.cookTime.min} minutes</p>
      <button className="menu-button" onClick={setTimer}> Start timer </button>
      <button className="menu-button" onClick={backToGallery}>Back</button>
    </div>
  
  </>

}