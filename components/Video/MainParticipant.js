import { useContext } from "react";
import useMainSpeaker from "../../hooks/useMainSpeaker";
import useScreenShareParticipant from "../../hooks/useScreenShareParticipant";
import { VideoContext } from "../../context/VideoContext";
import Participant from "./Participant";

const MainParticipant = () => {
  const mainParticipant = useMainSpeaker();
  const screenShareParticipant = useScreenShareParticipant();
  const { selectedParticipant } = useContext(VideoContext);

  const videoPriority =
    mainParticipant === selectedParticipant || mainParticipant === screenShareParticipant
      ? "high"
      : null;

  return <Participant participant={mainParticipant} disableAudio videoPriority={videoPriority} />;
};

export default MainParticipant;
