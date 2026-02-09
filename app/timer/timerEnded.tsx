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
    <p>Pasta should be done cooking! Do a taste test, the pasta should be slightly chewy. If not, cook for a bit longer!</p>
    <div className="radio-toolbar centered">
      <input id="1" type="radio" name="time" onChange={handleOptionChange} checked={time === 30} value="30" />
      <label htmlFor="1"> 30s </label>
      <input id="2" type="radio" name="time" onChange={handleOptionChange} checked={time === 60} value="60"/>
      <label htmlFor="2"> 1min </label>
      <input id="3" type="radio" name="time" onChange={handleOptionChange} checked={time === 120} value="120"/>
      <label htmlFor="3"> 2min </label>
    </div>
    <button className="menu-button" onClick={startTimer}>Start new timer</button>
    <button className="menu-button" onClick={back}>Back</button>
  </div>
  </>
}
