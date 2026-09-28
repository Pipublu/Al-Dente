import { useRef } from "react";
const SOUND = new URL(
  "sounds/BEEPTimer_Digital_watch_alarm_(ID2256)_BigSoundBank.com.wav",
  document.baseURI
).toString();
//https://pixabay.com/sound-effects/film-special-effects-digital-alarm-clock-151927/

export const useSound = () => {
  const soundRef = useRef<HTMLAudioElement | null>(null);

  const playSound = () => {
    if (!soundRef.current) {
        soundRef.current = new Audio(SOUND);
        soundRef.current.loop = true;
        soundRef.current.volume = 1;
    }
    soundRef.current.onerror = (event) => console.error("Audio error:", event);

    void soundRef.current.play()
    .then(() => console.log("Sound playing"))
    .catch((error) => console.error("Unable to play timer sound:", error));
};

  const pauseSound = () => {
    if (soundRef.current) {
        soundRef.current.pause();
        soundRef.current.currentTime = 0;
    }
  }

  return {
    playSound,
    pauseSound
  };
}