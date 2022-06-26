import { useRef, useEffect, useContext, Fragment } from "react";
import { Card, CardHeader } from "reactstrap";
import { VideoContext } from "../../context/VideoContext";
import styled from "styled-components";

const Video = styled.video`
  width: 100%;
  max-height: 900px;
  object-fit: contain;
  box-sizing: border-box;
`;

const VideoTrack = ({ track, isLocal, participant, priority }) => {
  const { selectedParticipant, toggleSelectedParticipant } = useContext(VideoContext);

  const trackRef = useRef(null);
  useEffect(() => {
    const element = trackRef.current;
    element.muted = true;
    if (track.setPriority && priority) {
      track.setPriority(priority);
    }
    track.attach(element);

    return () => {
      track.detach(element);
      if (track.setPriority && priority) {
        track.setPriority(null);
      }
    };
  }, [track]);

  const isSelectedParticipant = participant === selectedParticipant;
  const style = isSelectedParticipant ? { border: "5px solid #ADFF2F" } : {};

  return (
    <Fragment>
      <Card
        onClick={() => toggleSelectedParticipant(participant)}
        style={style}
        className="rounded-0"
      >
        {participant && (
          <CardHeader className="p-0 pl-2 font-weight-bold d-none d-sm-none d-md-none d-lg-block">
            {participant.identity}
          </CardHeader>
        )}
        <Video ref={trackRef} />
      </Card>
    </Fragment>
  );
};

export default VideoTrack;
