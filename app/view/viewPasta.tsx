import { useNavigate, useLocation } from "react-router";
import { secondsToHMS } from "utils/calculations";
import { useToast } from "~/toast/toastContext";
import {  Undo2, SquarePen} from 'lucide-react';
import { Tooltip } from 'react-tooltip'

export default function ViewPasta() {
  let navigate = useNavigate();
  const location = useLocation();
  const pasta = location.state?.pastaItem;
  const {showToast} = useToast();

  if (!pasta) {
    showToast("Error!", "Could not show pasta.", "red");
    navigate("/gallery");
    return null;
  }

  

  const time = secondsToHMS(pasta.cookTime);

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
        <button className="centered small-btn" onClick={backToGallery}
          data-tooltip-id="back-tooltip"
          data-tooltip-content="Back">
          <Undo2 />
          <Tooltip id="back-tooltip" clickable />
        </button>
        <h2>{pasta.name}</h2>
        <button className="centered small-btn" onClick={toEditPasta}
          data-tooltip-id="edit-tooltip"
          data-tooltip-content="Edit">
          <SquarePen />
          <Tooltip id="edit-tooltip" clickable />
        </button>
      </div>
      <div className="left-align vbox">
        <p className="left-align description">{pasta.description}</p>
        <p className="left-align">
          Cook time: {time.h > 0 ? time.h + " h " : ""} {time.min > 0 ? time.min + " min " : ""} {time.sec > 0 ? time.sec + " sec" : ""}
        </p>
      </div>
      <p className="large-text">{time.h > 0 ? time.h + " h " : ""} {time.min > 0 ? time.min + " min " : ""} {time.sec > 0 ? time.sec + " sec" : ""}</p>
      <button className="menu-btn" onClick={setTimer}>Start timer</button>
    </div>
  
  </>

}