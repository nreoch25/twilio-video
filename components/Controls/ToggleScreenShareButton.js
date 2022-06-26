import { useContext } from "react";
import { Button } from "reactstrap";
import { faWindowMaximize, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VideoContext } from "../../context/VideoContext";
import useScreenShareToggle from "../../hooks/useScreenShareToggle";
import useScreenShareParticipant from "../../hooks/useScreenShareParticipant";

const ToggleScreenShareButton = (props) => {
  const [isScreenShared, toggleScreenShare] = useScreenShareToggle();
  const screenShareParticipant = useScreenShareParticipant();
  const { room } = useContext(VideoContext);

  const disableScreenShareButton =
    screenShareParticipant && screenShareParticipant !== room.localParticipant;
  const isScreenShareSupported = navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia;
  const isDisabled = props.disabled || disableScreenShareButton || !isScreenShareSupported;

  return (
    <Button
      onClick={toggleScreenShare}
      disabled={isDisabled}
      className="brand-button ml-2 p-1 pr-2 pl-2"
    >
      {isScreenShared ? (
        <FontAwesomeIcon icon={faWindowClose} size="1x" />
      ) : (
        <FontAwesomeIcon icon={faWindowMaximize} size="1x" />
      )}
    </Button>
  );
};

export default ToggleScreenShareButton;
