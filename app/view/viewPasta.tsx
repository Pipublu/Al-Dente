import { useNavigate, useLocation } from "react-router";
import type { Pasta } from "types/pasta";


export default function ViewPasta() {
  let navigate = useNavigate();
  const location = useLocation();
  const pasta = location.state?.pastaItem;

  const backToGallery = () => {
    console.log("To gallery...");
    navigate("/gallery");
  };

  const setTimer = () => {
    console.log("To set timer...");
    navigate("/timer/running", { state: { time: pasta.cookTime.min} });
  };

  return <>
    <div className="centered tight vbox">
      <div className="topbar">
        <div></div>
        <h2>{pasta.name}</h2>
        <button className="small-btn">Edit</button>
      </div>
      <div className="left-align tight vbox">
        <p className="left-align description">{pasta.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sollicitudin cursus orci, eget tempor tellus mattis in. Aliquam viverra gravida nibh eu consequat. Nullam erat erat, mollis quis auctor et, vulputate at libero. Ut maximus nisi at molestie egestas. Nunc bibendum lectus ex, at sodales sem pellentesque sit amet. Cras interdum nunc quis fermentum imperdiet. Mauris lacinia, nulla vel eleifend dictum, lorem lacus hendrerit erat, eu euismod lorem nulla sed risus. Aliquam turpis augue, luctus quis commodo in, sodales vitae diam. Fusce vel nisi eu erat pretium condimentum. Praesent eget dapibus sapien. Fusce euismod congue risus sed iaculis. Pellentesque vel nulla quis justo porttitor finibus. Donec non ullamcorper dolor, semper sodales augue. Vestibulum id rhoncus odio. Ut sit amet lacus eget enim porttitor bibendum. Mauris pretium enim quis consequat suscipit.</p>
        <p className="left-align">
          Cook time: {pasta.cookTime.min} - {pasta.cookTime.max} minutes
        </p>
      </div>
      <p className="large-text">{pasta.cookTime.min} minutes</p>
      <button className="menu-button" onClick={setTimer}> Start timer </button>
      <button className="menu-button" onClick={backToGallery}>Back</button>
    </div>
  
  </>

}