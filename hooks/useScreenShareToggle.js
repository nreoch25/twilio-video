import { useState, useCallback, useRef, useContext } from "react";
import { VideoContext } from "../context/VideoContext";

const useScreenShareToggle = () => {
  const { room } = useContext(VideoContext);
  const [isSharing, setIsSharing] = useState(false);
  const stopScreenShareRef = useRef(null);
  const shareScreen = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        audio: false,
        video: {
          frameRate: 10,
          height: 1080,
          width: 1920,
        },
      });
      const track = stream.getTracks()[0];
      const trackPublication = await room.localParticipant.publishTrack(track, {
        name: "screen",
        priority: "low",
      });
      stopScreenShareRef.current = () => {
        room.localParticipant.unpublishTrack(track);
        room.localParticipant.emit("trackUnpublished", trackPublication);
        track.stop();
        setIsSharing(false);
      };
      track.onended = stopScreenShareRef.current;
      setIsSharing(true);
    } catch (error) {
      console.log("ERROR", error);
    }
  }, [room]);
  const toggleScreenShare = useCallback(() => {
    !isSharing ? shareScreen() : stopScreenShareRef.current();
  }, [isSharing, shareScreen, stopScreenShareRef]);
  return [isSharing, toggleScreenShare];
};

export default useScreenShareToggle;
