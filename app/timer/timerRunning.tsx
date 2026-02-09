import { Play, Pause, Square} from 'lucide-react';
import { useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";

export default function StartTimer() {
  let navigate = useNavigate();
  const location = useLocation();
  const total_time = location.state?.time || 0; 


  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);


  useEffect(() => {
    const end_date = Date.now() + total_time * 60 * 1e3; // time in millisecs
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const time = end_date - Date.now();

      if (time <= 0) { // if countdown is over
        setMinutes(0);
        setSeconds(0);
        console.log("Timer done");
        navigate("/timer/ended");
      }

      // update timer
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));

      timeout = setTimeout(tick, 1000 - (Date.now() % 1000));
    }; // call every 1s

    tick(); // to prevent it to look stuck as it is not being called first time
    return () => clearTimeout(timeout);
  }, [total_time, navigate]);

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