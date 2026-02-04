import { Play, Pause, Square} from 'lucide-react';
import { useNavigate } from "react-router";
import { useState } from "react";



export default function Timer() {


  return <>

    <div className="centered vbox">
      <h2>Cooking...</h2>

      <div className="circle fill">
        <div className="circle circle-centre">
          <p className="timer">00:30</p>
        </div>
      </div>
      <Buttons />
      
    </div>
  </>
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
