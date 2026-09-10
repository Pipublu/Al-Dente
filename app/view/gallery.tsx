import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { fetchPasta } from "utils/storageHandler";
import type { Pasta } from "types/pasta";
import { secondsToHMS } from "utils/calculations";
import { Plus, Undo2 } from 'lucide-react';
import { Tooltip } from 'react-tooltip'

export default function Gallery() {
  let navigate = useNavigate();

  const getPageSize = () => {
  if (window.innerWidth < 455) return 4;
  if (window.innerWidth < 600) return 6;
  return 8;
  };

  let page_size = getPageSize();
  const [currentPage, setCurrentPage] = useState(1);
  const [pastaArray, setPasta] = useState<Pasta[]>([]);

  const totalPages = Math.ceil(pastaArray.length / page_size);
  const startIndex = (currentPage - 1) * page_size;
  const endIndex = startIndex + page_size;
  const currentItems = pastaArray.slice(startIndex, endIndex);

  const back = () => {
    console.log("Leaving gallery..");
    navigate("/");
  };

  const addPasta = () => {
    console.log("Leaving gallery..");
    navigate("/edit");
  };


  const setPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const viewPasta = (id: string) => {
    console.log("Viewing pasta with id: ", id);
    const pasta = pastaArray.find((p) => p.id === id);

    if (!pasta) {
      console.log("Error: No pasta with id ", id, " found");
    } else {
      navigate("/view", { state: { pastaItem: pasta} });
    }
  }

  const loadPasta = async () => {
      try {
        const data = await fetchPasta();
        const sortedPasta = data.pasta.sort((a,b) => a.name.localeCompare(b.name));
        setPasta(sortedPasta);
        localStorage.setItem("pastaArray", JSON.stringify(sortedPasta));
      } catch (error) {
        console.log("Error: ", error)
        back();
      }
    };

  useEffect(() => {
    const stored = localStorage.getItem("pastaArray");

    if (stored) {
      console.log("Fetching pastas from storage...")
      console.log(JSON.parse(stored));
      setPasta(JSON.parse(stored));
    } else {
      console.log("Fetchig pasta from file...")
      loadPasta();
    }
}, []);

  return <>
    <div className="centered tight vbox">
      <div className="topbar">
        <button className="centered small-btn" onClick={back}
          data-tooltip-id="back-tooltip"
          data-tooltip-content="Back">
          <Undo2 />
          <Tooltip id="back-tooltip" clickable />
        </button>
        <h2>Choose pasta</h2>
        <button className="centered small-btn" onClick={addPasta}
          data-tooltip-id="create-tooltip"
          data-tooltip-content="Create new">
          <Plus />
          <Tooltip id="create-tooltip" clickable />
        </button>
      </div>
      <div className="grid grid-gallery">
        {currentItems.map((p) => (
          <Thumbnail key={p.id} pasta={p} onViewPasta={viewPasta}/>
         ))}
      </div>
      <Navigator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
       />

    </div>
  </>
}

type ThumbnailProps = {
  pasta: Pasta;
  onViewPasta: (id: string) => void;
};

function Thumbnail({ pasta, onViewPasta } : ThumbnailProps) {

  const time = secondsToHMS(pasta.cookTime);
  return <>
  <div className="centered thumbnail vbox" onClick={() => onViewPasta(pasta.id)}>
    <label className="bold">{pasta.name}</label>
    <label className="small-font">{time.h > 0 ? time.h + " h " : ""} {time.min > 0 ? time.min + " min " : ""} {time.sec > 0 ? time.sec + " sec" : ""}</label>
  </div>
  </>
}


interface NavigatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

function Navigator({ currentPage, totalPages, onPageChange } : NavigatorProps) {

  return<>
  <div className="centered bottom-bar">
    <button 
      disabled={currentPage === 1}
      className="pagination-btn"
      onClick={() => onPageChange(currentPage - 1)}
    > &lt; </button>
      {
        Array.from({ length: totalPages}, (_, i) => {
          return(
            <button 
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={(i + 1) === currentPage ? "pagination-active-btn pagination-btn" : "pagination-btn"}
            >
              {i + 1}
            </button>)
      })
      }
    <button 
      disabled={currentPage === totalPages}
      className="pagination-btn"
      onClick={() => onPageChange(currentPage + 1)}
    > &gt; </button>

  </div>
  </>
}