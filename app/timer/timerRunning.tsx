import { Play, Pause, Square} from 'lucide-react';
import { useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";

export default function StartTimer() {
  let navigate = useNavigate();
  const location = useLocation();
  const total_time = location.state?.time || 0; 

  const [timeLeft, setTimeLeft] = useState(total_time * 60 * 1000);

  const seconds = Math.floor((timeLeft / 1000) % 60);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);

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

      <div className="circle fill">
        <div className="circle circle-centre">
          <p className="timer">{ minutes } : { seconds }</p>
        </div>
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
            color="red"
            size={48}/>
          ) : (
          <Play 
            onClick={onPause}
            className="icon"
            color="red"
            size={48}/>
          )}
      </div>
      
      <div className="spacer"></div>
      <Square 
        onClick={onCancel}
        className="icon"
        color="red"
        size={48}/>
    </div>
  </>
}