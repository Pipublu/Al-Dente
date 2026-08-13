export interface Pasta {
  id: number,
  name: string,
  cookTime: number,
  description: string
}

export type PastaResponse = {
  pasta: Pasta[];
};
