import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { fetchPasta } from "utils/csvReader";
import type { Pasta } from "types/pasta";



export default function Gallery() {
  let navigate = useNavigate();

  const PAGE_SIZE = 1;
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
          <Thumbnail key={p.id} pasta={p} />
         ))}
      </div>
      <Navigator
        currentPage={currentPage}
        totalPages={totalPages}
       />
      <button onClick={back}> Back </button>

    </div>
  </>
}

type ThumbnailProps = {
  pasta: Pasta;
};

function Thumbnail({ pasta } : ThumbnailProps) {

  return <>
  <div className="centered thumbnail vbox">
    <label>{pasta.name}</label>
    <label>{pasta.cookTime.min}-{pasta.cookTime.max}min</label>
  </div>
  </>
}


interface NavigatorProps {
  currentPage: number;
  totalPages: number;
}

function Navigator({ currentPage, totalPages } : NavigatorProps) {
  const collapse = totalPages > 3;
  const firstPage = currentPage == 1;


  return<>
  <div className="centered">
    <button> &lt; </button>
    {
      !collapse ?
      (Array.from({ length: totalPages }, (_, i) => (
      <button key={i + 1}>{i + 1}</button>
      )))
      :
      (<div>
        <button>1</button>
        <button>{ currentPage}</button>
        <button>{ totalPages + 1}</button>
      </div>)
    }
    <button> &gt; </button>

  </div>
  </>
}