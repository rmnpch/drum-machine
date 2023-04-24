import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

export default function App() {
  const [power, setPower] = useState(true);
  const [display, setDisplay] = useState("Display");
  const [volume, setVolume] = useState(0.3);
  const [bank, setBank] = useState(false);

  const keys = [
    {
      keyName: "Q",
      id: "Heater-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
      keyName: "W",
      id: "Heater-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
      keyName: "E",
      id: "Heater-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
      keyName: "A",
      id: "Heater-4",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
      keyName: "S",
      id: "Clap",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
      keyName: "D",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      keyName: "Z",
      id: "Kick-n'-Hat",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
      keyName: "X",
      id: "Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    {
      keyName: "C",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
  ];

  const toggleState = (e) => {
    e.target.id === "power"
      ? setPower(!power)
      : e.target.id === "bank" && setBank(!bank);
  };

  const volumeSlider = (e) => {
    setVolume(e.target.value / 100);
    console.log("volume = ", volume);
    e.target.blur();
    console.log(e.target);
  };

  const handleClick = (event) =>{
    if (power===false) return;
    
    event.target.querySelector("audio").play();
  setDisplay(event.target.id);}

  useEffect(() => {
    const handleKeyPress = (event) => {
        //acionado pelo teclado
        const key = event.key.toUpperCase();
        const audioElement = document.querySelector(`#${key}`);
        if (audioElement !== null) {
          audioElement.volume = volume;
          audioElement.play();
          setDisplay(audioElement.parentElement.id);
        }
        //acionado pelo click
        // event.target.querySelector("audio").volume= volume
    };
    if (power) {
      document.addEventListener("keyup", handleKeyPress);
    }

    // Clean up the event listener when component unmounts or when `power` changes
    return () => {
      document.removeEventListener("keyup", handleKeyPress);
    };
  }, [power]);

  return (
    <div className="App" id="drum-machine">
      <div className="buttons">
        {keys.map((key, index) => (
          <button
            onClick={handleClick}
            id={key.id}
            key={index}
            className="button drum-pad"
          >
            {key.keyName}{" "}
            <audio
              src={key.url}
              volume={volume}
              className="clip"
              id={key.keyName}
            ></audio>
          </button>
        ))}
      </div>
      <div className="controls" id="display">
        <div className="power">
          <p>Power</p>
          <label className="toggle-switch">
            <input
              checked={power}
              type="checkbox"
              id="power"
              onChange={toggleState}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="displayViewer">{display}</div>

        {/* <div className="volumeSlider">
          <p>Volume</p>

          <input
            type="range"
            name="volume"
            id="volume"
            value={volume*100}
            onChange={volumeSlider}
          />
        </div>

        <div className="bank">
          <p>Bank</p>
          <label className="toggle-switch">
            <input
              checked={bank}
              type="checkbox"
              id="bank"
              onChange={toggleState}
            />
            <span className="slider"></span>
          </label>
        </div> */}
      </div>
    </div>
  );
}
