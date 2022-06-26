import { useCallback, useContext } from "react";
import useIsTrackEnabled from "./useIsTrackEnabled";
import { VideoContext } from "../context/VideoContext";

const useLocalAudioToggle = () => {
  const { localTracks } = useContext(VideoContext);
  const audioTrack = localTracks.find((track) => track.kind === "audio");
  const isEnabled = useIsTrackEnabled(audioTrack);

  const toggleAudioEnabled = useCallback(() => {
    if (audioTrack) {
      audioTrack.isEnabled ? audioTrack.disable() : audioTrack.enable();
    }
  }, [audioTrack]);

  return [isEnabled, toggleAudioEnabled];
};

export default useLocalAudioToggle;
