import { useNavigate } from "react-router";
import { useState } from "react";


export default function Gallery() {

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  return <>
    <div className="centered vbox">
      <h2>Choose pasta</h2>
      <div className="grid">
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
      </div>
      <Navigator
        currentPage={currentPage}
        totalPages={totalPages}
       />
    </div>
  </>
}


function Thumbnail() {

  return <>
  <div className="centered thumbnail vbox">
    <label>Penne</label>
    <label>10 mins</label>
  </div>
  </>
}


interface NavigatorProps {
  currentPage: number;
  totalPages: number;
}

function Navigator({ currentPage, totalPages } : NavigatorProps) {

  return<>
  <div className="centered">
    <button> &lt; </button>
    {Array.from({ length: totalPages }, (_, i) => (
      <button key={i}>{i}</button>
    ))}
    <button> &gt; </button>

  </div>
  </>
}