import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { fetchPasta } from "utils/csvReader";
import type { Pasta } from "types/pasta";

export default function EditPasta() {
  let navigate = useNavigate();

  const back = () => {
    console.log("Leaving gallery..");
    navigate("/gallery");
  };

  return <>
    <div className="centered vbox">
      <form>
        <input type="text" id="title" placeholder="Title" className="form-input-large" />
        <textarea 
          placeholder="Enter description..."
          rows={5}
          cols={40}
        />
        <div className="left-align full-width">
          <label>Cook-time:</label> 
        </div>
        <div className="left-align hbox container-time full-width">
          <input id="min-time" type="number" min="1"/>
          <label>minutes</label>
        </div>
      </form>
      <div className="centered hbox">
        <button onClick={back}>Back</button>
        <button>Save</button>
      </div>
    </div>
  </>
}