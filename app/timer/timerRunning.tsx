import { Play, Pause, Square} from 'lucide-react';
import { useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";

export default function StartTimer() {
  const location = useLocation();
  const total_time = location.state?.time || 0; 


  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const end_date = Date.now() + total_time * 60 * 1e3; // needs time in millisecs

  useEffect(() => {
    const interval = setInterval(() => {
      const time = end_date - Date.now();

      if (time <= 0) { // if countdown is over
        setMinutes(0);
        setSeconds(0);
        clearInterval(interval);
        console.log("Timer done");
        return;
      }

      // update timer
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));

    }, 1000); // call every 1s

    return () => clearInterval(interval);
  }, []);

  return <>

    <div className="centered vbox">
      <h2>Cooking...</h2>

      <div className="circle fill">
        <div className="circle circle-centre">
          <p className="timer">{ minutes } : { seconds }</p>
        </div>
      </div>
      <Buttons />
      
    </div>
  </>
}



function Buttons() {
  let navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisible = () => {
    setIsVisible(!isVisible);
    console.log("Pause set to: ", isVisible);
  }

  const cancel = () => {
    console.log("Stopping timer...");
    navigate("/timer/ended");
  }


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