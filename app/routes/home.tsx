import type { Route } from "./+types/home";
import Menu from "../menu/menu";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Al Dente" },
    { name: "description", content: "Welcome to Al dente!" },
  ];
}

export default function Home() {
  return <>
   <Menu />
  </>
 
}
