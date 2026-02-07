import { Play, Pause, Square} from 'lucide-react';
import { useNavigate, useLocation } from "react-router";
import { useState } from "react";

export default function Timer() {
  const location = useLocation();
  const time = location.state?.time || 0;

  let timeString = formatTime(time);

  return <>

    <div className="centered vbox">
      <h2>Cooking...</h2>

      <div className="circle fill">
        <div className="circle circle-centre">
          <p className="timer">{ timeString }</p>
        </div>
      </div>
      <Buttons />
      
    </div>
  </>
}

function formatTime(time: number) {
  // Takes time in minutes
  let minutes = Math.floor(time);
  let seconds = (time - minutes) * 60;
  console.log(minutes, seconds);

  let timeString = "";
  
  if (minutes < 10) {
    timeString += "0";
  }
  timeString += minutes + ":";

  if (seconds < 10) {
    timeString += "0";
  }
  timeString += seconds;

  console.log(timeString);
  return timeString;
}

export function Buttons() {
  let navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true);

  const toggleVisible = () => {
    setIsVisible(!isVisible);
    console.log("Pause set to: ", isVisible);
  }

  const cancel = () => {
    console.log("Timer canceled..");
    navigate("/");
  };


  return <>
    <div className="hbox">
      <div>
        {
          isVisible && ( <Pause 
            onClick={toggleVisible}
            className="icon"
            color="red"
            size={48}/>)
        }{
          !isVisible && ( <Play 
            onClick={toggleVisible}
            className="icon"
            color="red"
            size={48}/>)
        }
      </div>
      
      
      <div className="spacer"></div>
      <Square 
        onClick={cancel}
        className="icon"
        color="red"
        size={48}/>
    </div>
  </>
}
