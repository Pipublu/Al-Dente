import type { Pasta, PastaResponse } from "types/pasta";
const MAX_ATTEMPTS = 30;

async function readJsonFile(filePath: string) {
    try {
        const response = await fetch(filePath)

        if (!response.ok) {
            throw new Error("Failed to load file:" + response.status)
        }

        const jsonData = await response.json()
        return jsonData
    } catch (error) {
        console.log("Error reading JSON file: ", error)
        throw error
    }
}

function toPasta(obj: any): Pasta {
  return {
    id: obj.id,
    name: obj.name,
    description: obj.description,
    cookTime: Number(obj.cookTime)
  };
}


export function fetchPasta(path?:string): Promise<PastaResponse> {
  const filePath = path? path : "/pasta.json";

  return readJsonFile(filePath)
    .then(data => {
      console.log("Read pasta data: ", data)
      return data as PastaResponse;
    })
    .catch(error => {
        console.log("Failed to read pasta data: ", error)
        throw error;
    });
}

export async function readPastaFromFileObject(file: File): Promise<Pasta[]> {
  const raw = await file.text();
  const parsed = JSON.parse(raw);
  const data = Array.isArray(parsed) ? parsed: parsed?.pasta;
  return data;
}

export function mergePastaLists(newPasta: Pasta[]): Pasta[]  {
  console.log("New Pasta: ", newPasta);
  const oldPasta = getStoredPasta();
  
  for (const update of newPasta) {
    const index = oldPasta.findIndex(item => item.id === update.id);
    if (index !== -1) {
      // Replace old pasta if same id
      oldPasta[index] = update;
    } else {
      // Else add
      oldPasta.push(update);
    }
  }
  return oldPasta.sort((a,b) => a.name.localeCompare(b.name));
}


function getStoredPasta(): Pasta[] {
  const pastaList = localStorage.getItem("pastaArray");
  
  return pastaList ? JSON.parse(pastaList) : [];
}

export function savePasta(newPasta: Pasta) {
  const pastaObjects = getStoredPasta();

  if (pastaObjects.length === 0) {
    throw new Error("Could not fetch stored pasta objects");
  }

  let newPastaList;
  // Update pasta
  if (newPasta.id) {
    newPastaList = pastaObjects.map((p) => p.id == newPasta.id ? newPasta : p);
    console.log("Updated pasta: ", newPasta.name);
  } else {
    // New pasta
    newPasta.id = generateNewId(pastaObjects);

    if (!newPasta.id) {
      throw new Error("Could not generate UUID");
    }
    newPastaList = pastaObjects.concat(newPasta);
    console.log("Created new pasta type: ", newPasta.name);
  }

  // Update storage
  const sortedPasta = newPastaList.sort((a,b) => a.name.localeCompare(b.name));
  localStorage.setItem("pastaArray", JSON.stringify(sortedPasta));
}

function generateNewId(pastaList: Pasta[]): string {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const uuid = crypto.randomUUID();
    const exists = pastaList.some((p) => p.id === uuid);

    if (!exists) {
      return uuid;
    }
  }
  console.log("Could not generate UUID for pasta!");
  return "";
}

function createFile(pastaList: Pasta[]) {
  const element = document.createElement("a");
  const jsonFile = new Blob([JSON.stringify(pastaList)], {type: 'application/json'});
  element.href = URL.createObjectURL(jsonFile);
  element.download = "pastaFile.json";
  document.body.appendChild(element); 
  element.click();
}

export function downloadJSON() {
  const pastaObjects = getStoredPasta();

  if (pastaObjects.length === 0) {
    console.log("No pastas saved in local storage!");
    return;
  }

  try {
    createFile(pastaObjects);
  } catch (error) {
    console.log("Error creating download file: ", error);
  }
 
}
