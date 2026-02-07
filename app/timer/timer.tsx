import { useNavigate, useLocation } from "react-router";

export default function Timer() {
  let navigate = useNavigate();
  const location = useLocation();
  const total_time = location.state?.time || 0; 
  const pasta_name = location.state?.type || "pasta";


  const start = () => {
    console.log("Starting timer for : ", total_time);
    navigate("/timer/running", { state: { time: 0.1 } });
  }

  const back = () => {
    console.log("Leaving timer..");
    navigate("/");
  };

  return <>

    <div className="centered vbox">
      <h2>Ready to cook some { pasta_name }?</h2>
      <h3>Cooktime: { total_time * 60 } minutes</h3>
      <button className="menu-button" onClick={start}> Start timer </button>
      <button className="menu-button" onClick={back}> Back </button>
    </div>
  </>
}

