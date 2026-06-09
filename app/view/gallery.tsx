import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { fetchPasta } from "utils/csvReader";
import type { Pasta } from "types/pasta";



export default function Gallery() {
  let navigate = useNavigate();

  const PAGE_SIZE = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [pastaArray, setPasta] = useState<Pasta[]>([]);

  const totalPages = Math.ceil(pastaArray.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentItems = pastaArray.slice(startIndex, endIndex);

  const back = () => {
    console.log("Leaving gallery..");
    navigate("/");
  };

  const setPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const viewPasta = (id: number) => {
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
        setPasta(data.pasta);
        sessionStorage.setItem("pastaArray", JSON.stringify(data.pasta));
      } catch (error) {
        console.log("Error: ", error)
        back();
      }
    };

  useEffect(() => {
    const stored = sessionStorage.getItem("pastaArray");

    if (stored) {
      console.log("Fetching pastas from storage...")
      setPasta(JSON.parse(stored));
    } else {
      console.log("Fetchig pasta from file...")
      loadPasta();
    }
}, []);

  return <>
    <div className="centered vbox">
      <h2>Choose pasta</h2>
      <div className="grid">
        {currentItems.map((p) => (
          <Thumbnail key={p.id} pasta={p} onViewPasta={viewPasta}/>
         ))}
      </div>
      <Navigator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
       />
      <button onClick={back}> Back </button>

    </div>
  </>
}

type ThumbnailProps = {
  pasta: Pasta;
  onViewPasta: (id: number) => void;
};

function Thumbnail({ pasta, onViewPasta } : ThumbnailProps) {

  return <>
  <div className="centered thumbnail vbox" onClick={() => onViewPasta(pasta.id)}>
    <label>{pasta.name}</label>
    <label>{pasta.cookTime.min}-{pasta.cookTime.max}min</label>
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
  <div className="centered">
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