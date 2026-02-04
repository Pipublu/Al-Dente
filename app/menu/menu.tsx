

export default function Menu() {
  const exit = () => {
    console.log("Exiting...");
  };

  const view = () => {
    console.log("To view pasta..");
  };

  const timer = () => {
    console.log("To set timer...");
  };
  return <>
    <div className="centered vbox">
      <h1 className="title">Al Dente</h1>
      <div className="vbox">
        <button className="menu-button" onClick={timer}> Start timer </button>
        <button className="menu-button" onClick={view}> View pastas </button>
        <button className="menu-button" onClick={exit}> Quit </button>
      </div>
    </div>
  </>
}