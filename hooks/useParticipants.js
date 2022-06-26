import { useEffect, useState, useContext } from "react";
import { VideoContext } from "../context/VideoContext";
import useDominantSpeaker from "./useDominantSpeaker";

const useParticipants = () => {
  const { room } = useContext(VideoContext);
  const dominantSpeaker = useDominantSpeaker();
  const [participants, setParticipants] = useState(Array.from(room.participants.values()));

  useEffect(() => {
    if (dominantSpeaker) {
      setParticipants((prev) => [
        dominantSpeaker,
        ...prev.filter((participant) => participant !== dominantSpeaker),
      ]);
    }
  }, [dominantSpeaker]);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prev) => [...prev, participant]);
    };
    const participantDisconnected = (participant) => {
      setParticipants((prev) => prev.filter((p) => p !== participant));
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  return participants;
};

export default useParticipants;
