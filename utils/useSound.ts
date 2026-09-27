import { useRef } from "react";
import SOUND from "public/sounds/BEEPTimer_Digital watch alarm (ID 2256)_BigSoundBank.com.wav";
//const SOUND = "../public/BEEPTimer_Digital watch alarm (ID 2256)_BigSoundBank.com.wav"

//https://pixabay.com/sound-effects/film-special-effects-digital-alarm-clock-151927/

export const useSound = () => {
  const soundRef = useRef<HTMLAudioElement | null>(null);

  const playSound = () => {
    if (!soundRef.current) {
        soundRef.current = new Audio(SOUND);
        soundRef.current.loop = true;
    }

    void soundRef.current.play().catch((error) => {
      console.error("Unable to play timer sound:", error);
    });
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