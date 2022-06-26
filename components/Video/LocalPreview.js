import { useContext } from "react";
import { Card, CardBody } from "reactstrap";
import VideoTrack from "./VideoTrack";
import { VideoContext } from "../../context/VideoContext";

const LocalPreview = () => {
  const { localTracks } = useContext(VideoContext);
  const videoTrack = localTracks.find((track) => track.name === "camera");
  return videoTrack ? (
    <Card>
      <CardBody className="p-2">
        <VideoTrack track={videoTrack} />
      </CardBody>
    </Card>
  ) : null;
};

export default LocalPreview;
