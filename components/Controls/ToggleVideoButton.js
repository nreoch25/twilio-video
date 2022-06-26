import { Button } from "reactstrap";
import { faVideoSlash, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLocalVideoToggle from "../../hooks/useLocalVideoToggle";

const ToggleVideoButton = () => {
  const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();

  return (
    <Button onClick={toggleVideoEnabled} className="ml-2 brand-button p-1 pr-2 pl-2">
      {isVideoEnabled ? (
        <FontAwesomeIcon icon={faVideo} size="1x" />
      ) : (
        <FontAwesomeIcon icon={faVideoSlash} size="1x" />
      )}
    </Button>
  );
};

export default ToggleVideoButton;
