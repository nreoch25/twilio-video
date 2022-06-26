import { useContext } from "react";
import { VideoContext } from "../context/VideoContext";
import useDominantSpeaker from "./useDominantSpeaker";
import useScreenShareParticipant from "./useScreenShareParticipant";
import useParticipants from "./useParticipants";

const useMainSpeaker = () => {
  const { selectedParticipant } = useContext(VideoContext);
  const screenShareParticipant = useScreenShareParticipant();
  const dominantSpeaker = useDominantSpeaker();
  const participants = useParticipants();
  const {
    room: { localParticipant },
  } = useContext(VideoContext);

  return (
    selectedParticipant ||
    screenShareParticipant ||
    dominantSpeaker ||
    participants[0] ||
    localParticipant
  );
};

export default useMainSpeaker;
