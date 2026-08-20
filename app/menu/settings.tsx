import { useNavigate } from "react-router";
import { useState, useRef, type ChangeEvent} from "react";
import type { PastaResponse } from "types/pasta";
import { downloadJSON, fetchPasta, mergePastaLists, readPastaFromFileObject } from "utils/fileHandler";
import { ArrowDownToLine, Plus, Undo2, Minus } from 'lucide-react';

export default function Settings() {
  let navigate = useNavigate();

  const fileInput = useRef<HTMLInputElement>(null);


  const back = () => {
    navigate("/");
  }

  const reset = () => {
    localStorage.removeItem("pastaArray");
    console.log("Reset pastas!");
  }

  const download = () => {
    downloadJSON();
  }

  const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if(!file) {
      console.log("No file uploaded...");
      return;
    }

    if (file.type !== "application/json" && !file.name.endsWith(".json")) {
      console.log("File must be .JSON");
      return;
    }  

    try {
      const data = await readPastaFromFileObject(file);
      const pastaArray = mergePastaLists(data);
      localStorage.setItem("pastaArray", JSON.stringify(pastaArray));
      console.log("Set new pasta: ", pastaArray);
    } catch (err) {
      console.log("Invalid JSON file:", err);
    } finally {
      event.target.value = "";
    }
  }


  return <>
    <div className="centered vbox">
      <h2>Manage pasta</h2>
      <div className="v-spacer"></div>
      <div className="grid-2col left-align">
        <label>Import pasta from .JSON.</label>
        <button className="dark-btn centered" onClick={() => fileInput.current?.click()}>
          <Plus />
          <input 
            type='file'
            name='file'
            ref={fileInput}
            accept=".json,application/json"
            onChange={uploadFile}
            style={{ display: 'none' }}
           />
        </button>
        <label>Reset all pasta. This will unload all additional pasta files.</label>
        <button className="dark-btn centered" onClick={reset}>
          <Minus />
        </button>
        <label>Download current pasta as .JSON.</label>
        <button className="dark-btn centered" onClick={download}>
          <ArrowDownToLine />
        </button>
      </div>
      <button className="menu-btn dark-btn centered" onClick={back}>
        <Undo2 />
        Back
      </button>

    </div>
  </>
}