import { Fragment } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTrack from "../../hooks/useTrack";
import VideoTrack from "./VideoTrack";
import AudioTrack from "./AudioTrack";

const Publication = ({
  publication,
  isLocal,
  participant,
  videoPriority,
  isVideoEnabled,
  disableAudio,
}) => {
  const track = useTrack(publication);

  if (!track) return null;
  return (
    <Fragment>
      {track.kind === "video" && (
        <VideoTrack
          track={track}
          isLocal={isLocal}
          participant={participant}
          priority={videoPriority}
        />
      )}
      {track.kind === "audio" && !isVideoEnabled && (
        <Card>
          <CardHeader className="p-1 pl-3 font-weight-bold">{participant.identity}</CardHeader>
          <CardBody className="p-5 text-center bg-dark">
            <FontAwesomeIcon icon={faUser} size="6x" inverse />
          </CardBody>
        </Card>
      )}
      {track.kind === "audio" && !disableAudio && <AudioTrack track={track} />}
    </Fragment>
  );
};

export default Publication;
