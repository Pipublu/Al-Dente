export interface Pasta {
  id: number;
  name: string;
  cookTime: {
    min: number,
    max: number
  };
  description: string;
}

export type PastaResponse = {
  pasta: Pasta[];
};
