import { useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { savePasta } from "utils/fileHandler";
import { secondsToHMS } from "utils/calculations";
import type { Pasta } from "types/pasta";


export default function EditPasta() {
  let navigate = useNavigate();
  const location = useLocation();
  const pasta = location.state?.pasta ?? undefined;

  const validForm = false;

  const [title, setTitle] = useState(pasta?.name ?? "");
  const [description, setDescription] = useState(pasta?.description ?? "");
  
  let time;

  if (pasta) {
    time = secondsToHMS(pasta.cookTime);
  }

  const [seconds, setSeconds] = useState(time?.sec ?? 0);
  const [minutes, setMinutes] = useState(time?.min ?? 0);
  const [hours, setHours] = useState(time?.h ?? 0);


  const back = () => {
    console.log("Leaving gallery..");
    navigate("/gallery");
  };
  
  const save = () => {
    const newTime = transformTimeInput();
    if (newTime <= 0) {
      console.log("Time has to be greater than 0");
      return;
    }
    const pastaId = pasta? pasta.id : "";
    const newPasta = {
      id: pastaId,
      name: title,
      description: description,
      cookTime: newTime,
    }
    try {
      savePasta(newPasta);
      navigate("/gallery");
    } catch (error) {
      console.log("Could not create/update pasta: ", error);
    }
  }

  const transformTimeInput = () => {
    const time = hours * 60**2 + minutes * 60 + seconds;
    return time;
  }
  


  return <>
    <div className="centered vbox">
      <form>
        <input type="text" id="title" placeholder="Title" className="form-input-large" value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }} 
        />
        <div className="left-align full-width">
          <label>Description:</label> 
        </div>
        <textarea
          id="description"
          placeholder="Enter description..."
          rows={5}
          cols={40}
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <div className="left-align full-width">
          <label>Cook-time:</label> 
        </div>
        <div className="">
          <div className="grid grid-large-spacing text-gray-600">
            <label>hh</label>
            <label>mm</label>
            <label>ss</label>
          </div>
          <div className="centered hbox container-time time-input">
            <input 
            id="time-h" 
            type="number" 
            placeholder="00" 
            min="0"
            max="10"
            value={hours}
            onKeyDown={(event) => {
              if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
                event.preventDefault();
              }
            }}
            onChange={(event) => {
              let value = Number(event.target.value)
              if(value > 10) {
                value = 10;
              }
              setHours(value);
            }}
          />
          <label>:</label>
          <input 
            id="time-min" 
            type="number" 
            placeholder="00" 
            min="0"
            max="59"
            value={minutes}
            onKeyDown={(event) => {
              if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
                event.preventDefault();
              }
            }}
            onChange={(event) => {
              let value = Number(event.target.value)
              if(value > 59) {
                value = 59;
              }
              setMinutes(value);
            }}
          />
          <label>:</label>
          <input 
            id="time-sec"
            type="number" 
            placeholder="00" 
            min="0"
            max="59"
            value={seconds}
            onKeyDown={(event) => {
              if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
                event.preventDefault();
              }
            }}
            onChange={(event) => {
              let value = Number(event.target.value)
              if(value > 59) {
                value = 59;
              }
              setSeconds(value);
            }}
          />
          </div>
        </div>
      </form>
      <div className="centered hbox">
        <button className="dark-btn" onClick={back}>Back</button>
        <button className="dark-btn" onClick={save}>Save</button>
      </div>
    </div>
  </>
}