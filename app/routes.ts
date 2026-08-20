import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("gallery", "view/gallery.tsx"),
  route("view", "view/viewPasta.tsx"),
  route("edit", "view/editPasta.tsx"),
  route("timer", "timer/timer.tsx"),
  route("timer/ended", "timer/timerEnded.tsx"),
  route("timer/running", "timer/timerRunning.tsx"),
  route("settings", "menu/settings.tsx"),

] satisfies RouteConfig;
