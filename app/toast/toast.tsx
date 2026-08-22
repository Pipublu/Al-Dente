
const toastColors: Record<string, string> = {
  green: "#3EBD68",
  red: "#F54927"
}


interface ToastPropts {
  bgColor?: string;
  message: string;
  title?: string;
  fontColor?: string;
  fadeOut?: boolean;
}


export default function Toast({ bgColor, message, title, fontColor, fadeOut}: ToastPropts) {
  const resColor = bgColor?  toastColors[bgColor] : "white";
  const resFontColor = fontColor ?? "black";

  return (
    
    <div className={`toast tight ${fadeOut ? "fade-out" : ""}`} style={{ backgroundColor: resColor }}>
      {title && <h3 className="medium-font">{title}</h3>}
      <p style={{ color: resFontColor }}>{message}</p>
    </div>
  );
}