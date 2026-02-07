import { useNavigate} from "react-router";
import { useState } from 'react';


export default function TimerEnded() {
  const [time, setTime] = useState(30);
  let navigate = useNavigate();

  const back = () => {
    console.log("Back to main menu...");
    navigate("/");
  }

  const startTimer = () => {
    console.log("Starting new timer, ", time, "s...");
    navigate("/timer/running", { state: { time: time / 60} } )
  }

  const handleOptionChange = (event: any) => {
    setTime(Number(event.target.value));
  };

  return <>
  <div className="centered vbox">

    <h2>Enjoy!</h2>
    <p>Pasta should be done cooking! Do a taste test, the pasta should be slightly chewy. If not, cook for a but longer!</p>
    <div className="centered hbox">
      <label><input type="radio" name="time" onChange={handleOptionChange} checked={time === 30} value="30" /> 30s </label>
      <label><input type="radio" name="time" onChange={handleOptionChange} checked={time === 60} value="60"/> 1min </label>
      <label><input type="radio" name="time" onChange={handleOptionChange} checked={time === 120} value="120"/> 2min </label>
    </div>
    <button className="menu-button" onClick={startTimer}>Start timer</button>
    <button className="menu-button" onClick={back}>Back</button>
  </div>
  </>
}
