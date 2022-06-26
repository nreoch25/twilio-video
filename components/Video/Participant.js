import { useContext, Fragment } from "react";
import { VideoContext } from "../../context/VideoContext";
import usePublications from "../../hooks/usePublications";
import Publication from "./Publication";

const Participant = ({ participant, videoPriority, disableAudio }) => {
  const { room, updateChatMessages } = useContext(VideoContext);
  const publications = usePublications(participant, updateChatMessages);
  const isLocal = participant === room.localParticipant;

  let filteredPublications;
  if (publications.some((p) => p.trackName === "screen")) {
    filteredPublications = publications.filter((p) => p.trackName !== "camera");
  } else {
    filteredPublications = publications.filter((p) => p.trackName !== "screen");
  }

  const isVideoEnabled = filteredPublications.filter((publication) => publication.kind === "video");

  return (
    <Fragment>
      {filteredPublications.map((publication) => {
        return (
          <Publication
            key={publication.kind}
            publication={publication}
            participant={participant}
            isLocal={isLocal}
            videoPriority={videoPriority}
            disableAudio={disableAudio}
            isVideoEnabled={isVideoEnabled.length > 0}
          />
        );
      })}
    </Fragment>
  );
};

export default Participant;
