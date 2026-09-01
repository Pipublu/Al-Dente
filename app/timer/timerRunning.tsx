import { Play, Pause, Square} from 'lucide-react';
import { useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { secondsToHMS } from 'utils/calculations';

export default function StartTimer() {
  let navigate = useNavigate();
  const location = useLocation();
  const total_time = location.state?.time || 0; 

  // convert to ms for smoother run
  const [timeLeft, setTimeLeft] = useState(total_time * 1000);

  const time = secondsToHMS(Math.floor(timeLeft / 1000));

  const hours = time.h;
  const minutes = time.min;
  const seconds = time.sec;
  

  const [isRunning, setIsRunning] = useState(true);


  useEffect(() => {
    if (!isRunning) return;

     // time in millisecs
    const interval = setInterval(() => {

      setTimeLeft(prev => {
        if (prev <= 1000) {
          clearInterval(interval);
          navigate("/timer/ended");
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, navigate]);

  return <>
    <div className="centered vbox">
      <h2>Cooking...</h2>

      <div className="centered timer-box fill">
          <p className="timer">{hours > 0 ? hours + " : " : ""} { minutes } : { seconds }</p>
      </div>
      <Buttons 
        isRunning={isRunning}
        onPause={() => setIsRunning(prev => !prev)}
        onCancel={() => navigate("/timer/ended")}
        />
    </div>
  </>
}


interface ButtonsProps {
  isRunning: boolean;
  onPause: () => void;
  onCancel: () => void;
}

function Buttons({ isRunning, onPause, onCancel }: ButtonsProps) {
  return <>
    <div className="hbox">
      <div>
        {
          isRunning ? ( 
          <Pause 
            onClick={onPause}
            className="icon"
            color="brown"
            size={48}/>
          ) : (
          <Play 
            onClick={onPause}
            className="icon"
            color="brown"
            size={48}/>
          )}
      </div>
      
      <div className="spacer"></div>
      <Square 
        onClick={onCancel}
        className="icon"
        color="brown"
        size={48}/>
    </div>
  </>
}