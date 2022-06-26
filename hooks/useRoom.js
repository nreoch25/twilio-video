import { useState, useRef, useCallback, useEffect } from "react";
import Video from "twilio-video";
import { isMobile } from "../utils";

const useRoom = (localTracks, options) => {
  const [room, setRoom] = useState(null);
  const localTracksRef = useRef([]);

  useEffect(() => {
    localTracksRef.current = localTracks;
  }, [localTracks]);

  const connect = useCallback(
    async (token) => {
      const newRoom = await Video.connect(token, { ...options, tracks: [] });
      setRoom(newRoom);

      const disconnect = () => {
        newRoom.disconnect();
      };

      newRoom.once("disconnected", () => {
        setRoom(null);
        window.removeEventListener("beforeunload", disconnect);
        if (isMobile) {
          window.removeEventListener("pagehide", disconnect);
        }
      });

      localTracksRef.current.forEach((track) => {
        newRoom.localParticipant.publishTrack(track, {
          priority: track.kind === "video" ? "low" : "standard",
        });
      });

      // Add a listener to disconnect from the room when a user closes their browser
      window.addEventListener("beforeunload", disconnect);

      if (isMobile) {
        // Add a listener to disconnect from the room when a mobile user closes their browser
        window.addEventListener("pagehide", disconnect);
      }
    },
    [options]
  );

  return { room, connect };
};

export default useRoom;
