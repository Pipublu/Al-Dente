import type { Pasta, PastaDict } from "types/pasta";

async function readJsonFile(filePath: string) {
    try {
        const response = await fetch(filePath)

        if (!response.ok) {
            throw new Error("Failed to load file:" + response.status)
        }

        const jsonData = await response.json()
        return jsonData
    } catch (error) {
        console.error("Error reading JSON file: ", error)
        throw error
    }
}

function toPasta(obj: any): Pasta {
  return {
    id: Number(obj.id),
    name: obj.name,
    description: obj.description,
    cookTime: {
      min: Number(obj.cookMin),
      max: Number(obj.cookMax),
    },
  };
}


export function fetchPasta(): Promise<PastaDict> {
  const filePath = "/pasta.json";

  return readJsonFile(filePath)
    .then(data => {
      console.log("Read pasta data: ", data)
      return data as PastaDict;
    })
    .catch(error => {
        console.error("Failed to read pasta data: ", error)
        throw error;
    });
}

