export interface Pasta {
  id: string,
  name: string,
  cookTime: number,
  description: string
}

export type PastaResponse = {
  pasta: Pasta[];
};
