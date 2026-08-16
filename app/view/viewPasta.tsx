import { useNavigate, useLocation } from "react-router";
import type { Pasta } from "types/pasta";
import { secondsToHMS } from "utils/calculations";


export default function ViewPasta() {
  let navigate = useNavigate();
  const location = useLocation();
  const pasta = location.state?.pastaItem;

  const time = secondsToHMS(pasta.cookTime);
  console.log(time);

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
          Cook time: {time.h > 0 ? time.h + " h " : ""} {time.min > 0 ? time.min + " min " : ""} {time.sec > 0 ? time.sec + " sec" : ""}
        </p>
      </div>
      <p className="large-text">{time.h > 0 ? time.h + " h " : ""} {time.min > 0 ? time.min + " min " : ""} {time.sec > 0 ? time.sec + " sec" : ""}</p>
      <button className="menu-btn dark-btn" onClick={setTimer}>Start timer</button>
      <button className="menu-btn dark-btn" onClick={backToGallery}>Back</button>
    </div>
  
  </>

}