import type { Route } from "./+types/home";
import Menu from "../menu/menu";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Menu />;
}
