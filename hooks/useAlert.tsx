import { useRef } from "react";

export const useAlertAudio = (audioFile: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAlert = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioFile);
    }
    audioRef.current.play();
  };

  return playAlert;
};
