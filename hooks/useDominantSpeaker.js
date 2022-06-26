import { useEffect, useState, useContext } from "react";
import { VideoContext } from "../context/VideoContext";

const useDominantSpeaker = () => {
  const { room } = useContext(VideoContext);
  const [dominantSpeaker, setDominantSpeaker] = useState(room.dominantSpeaker);

  useEffect(() => {
    const handleDominantSpeakerChanged = (newDominantSpeaker) => {
      if (newDominantSpeaker !== null) {
        setDominantSpeaker(newDominantSpeaker);
      }
    };

    const handleParticipantDisconnected = (participant) => {
      setDominantSpeaker((prevDominantSpeaker) => {
        return prevDominantSpeaker === participant ? null : prevDominantSpeaker;
      });
    };

    room.on("dominantSpeakerChanged", handleDominantSpeakerChanged);
    room.on("participantDisconnected", handleParticipantDisconnected);
    return () => {
      room.off("dominantSpeakerChanged", handleDominantSpeakerChanged);
      room.off("participantDisconnected", handleParticipantDisconnected);
    };
  }, [room]);

  return dominantSpeaker;
};

export default useDominantSpeaker;
