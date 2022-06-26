import { useEffect, useState, useCallback } from "react";
import Video from "twilio-video";
import { ensureMediaPermissions } from "../utils";

const useLocalTracks = () => {
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localDataTrack, setLocalDataTrack] = useState(null);

  useEffect(() => {
    async function getLocalTracks() {
      try {
        await ensureMediaPermissions();
        const audio = await Video.createLocalAudioTrack();
        setLocalAudioTrack(audio);
        const video = await Video.createLocalVideoTrack({
          frameRate: 24,
          height: 720,
          width: 1280,
          name: "camera",
        });
        setLocalVideoTrack(video);
        setLocalDataTrack(new Video.LocalDataTrack());
      } catch (error) {
        console.log("ERROR", error.message);
      }
    }
    getLocalTracks();
  }, []);

  const getLocalVideoTrack = useCallback(async () => {
    const newTrack = await Video.createLocalVideoTrack({
      frameRate: 24,
      height: 720,
      width: 1280,
      name: "camera",
    });
    setLocalVideoTrack(newTrack);
    return newTrack;
  }, []);

  useEffect(() => {
    const handleStopped = () => setLocalVideoTrack(null);
    if (localVideoTrack) {
      localVideoTrack.on("stopped", handleStopped);
      return () => {
        localVideoTrack.off("stopped", handleStopped);
      };
    }
  }, [localVideoTrack]);

  const localTracks = [localAudioTrack, localVideoTrack, localDataTrack].filter(
    (track) => track !== null
  );
  return { localTracks, getLocalVideoTrack };
};

export default useLocalTracks;
