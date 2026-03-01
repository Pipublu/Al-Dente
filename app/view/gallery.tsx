import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { fetchPasta } from "utils/csvReader";
import { calculatePages } from "utils/calculations";
import type { Pasta, PastaDict } from "types/pasta";



export default function Gallery() {
  let navigate = useNavigate();


  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;
  const [pastaDict, setPasta] = useState<PastaDict>({});

  const back = () => {
    console.log("Leaving timer..");
    navigate("/");
  };

  const loadPasta = async () => {
      console.log("Fetchig pasta...")
      try {
        const data = await fetchPasta();
        setPasta(data);
        sessionStorage.setItem("pastaDict", JSON.stringify(data.pasta));

      } catch (error) {
        console.log("Error: ", error)
        back;
      }
    };


  useEffect(() => {
    const stored = sessionStorage.getItem("pastaDict");

    if (stored) {
      setPasta(JSON.parse(stored));
    } else {
      loadPasta();
      Object.values(pastaDict).map((p) => {
          console.log(p);
        });
    }
    
}, []);

  return <>
    <div className="centered vbox">
      <h2>Choose pasta</h2>
      <div className="grid">
        {Object.values(pastaDict).map((p) => (
          <Thumbnail key={p.id} pasta={p} />
        ))}
      </div>
      <Navigator
        currentPage={currentPage}
        totalPages={totalPages}
       />
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