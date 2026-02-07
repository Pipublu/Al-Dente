import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  //route("gallery", "gallery.tsx"),
  route("timer", "timer/timer.tsx"),
  route("timer/ended", "timer/timerEnded.tsx"),
  route("timer/running", "timer/timerRunning.tsx"),
  //route("view", "view.tsx"),
  //route("complete", "complete.tsx"),
  //route("overview", "overview.tsx"),
] satisfies RouteConfig;
