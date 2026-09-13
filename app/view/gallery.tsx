import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { fetchPasta } from "utils/storageHandler";
import type { Pasta } from "types/pasta";
import { secondsToHMS } from "utils/calculations";
import { Plus, Undo2, Ellipsis } from 'lucide-react';
import { Tooltip } from 'react-tooltip'

type PageItem = number | "...";


export default function Gallery() {
  let navigate = useNavigate();

  const getPageSize = () => {
  if (window.innerWidth < 455 && window.innerHeight < 765) return 4;
  if (window.innerWidth < 600 && window.innerHeight < 765) return 6;
  if (window.innerWidth >= 600 && window.innerHeight < 765) return 8;
  if (window.innerWidth < 455) return 6;
  if (window.innerWidth < 600) return 9;
  return 12;
  };

  let page_size = getPageSize();
  const [currentPage, setCurrentPage] = useState(1);
  const [pastaArray, setPasta] = useState<Pasta[]>([]);

  const totalPages = Math.ceil(pastaArray.length / page_size);
  const startIndex = (currentPage - 1) * page_size;
  const endIndex = startIndex + page_size;
  const currentItems = pastaArray.slice(startIndex, endIndex);

  function getPageItems(currentPage: number, totalPages: number): PageItem[] {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 2) {
      return [1, 2, "...", totalPages];
    }

    if (currentPage >= totalPages - 1) {
      return [1, "...", totalPages - 1, totalPages];
    }

    return [1, "...", currentPage, "...", totalPages];
  }

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
        getPageItems={getPageItems}
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
  getPageItems: (currentPage: number, totalPages: number) => PageItem[];
}

function Navigator({ currentPage, totalPages, onPageChange, getPageItems } : NavigatorProps) {

  type PageItem = number | "...";

  return<>
  <div className="centered bottom-bar">
    <button 
      disabled={currentPage === 1}
      className="pagination-btn"
      onClick={() => onPageChange(currentPage - 1)}
    > &lt; </button>
      {getPageItems(currentPage, totalPages).map((item, index:number) =>
      item === "..." ? (
        <Ellipsis />
      ) : (
        <button
          key={item}
          onClick={() => onPageChange(item)}
          className={
            item === currentPage
              ? "pagination-active-btn pagination-btn"
              : "pagination-btn"
          }
          aria-current={item === currentPage ? "page" : undefined}
          disabled={item === currentPage}
        >
          {item}
        </button>
      )
    )}
    <button 
      disabled={currentPage === totalPages}
      className="pagination-btn"
      onClick={() => onPageChange(currentPage + 1)}
    > &gt; </button>

  </div>
  </>
}