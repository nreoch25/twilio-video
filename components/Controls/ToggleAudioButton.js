import { Button } from "reactstrap";
import { faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLocalAudioToggle from "../../hooks/useLocalAudioToggle";

const ToggleAudioButton = () => {
  const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();

  return (
    <Button onClick={toggleAudioEnabled} className="ml-2 brand-button p-1 pr-2 pl-2">
      {isAudioEnabled ? (
        <FontAwesomeIcon icon={faVolumeUp} size="1x" />
      ) : (
        <FontAwesomeIcon icon={faVolumeMute} size="1x" />
      )}
    </Button>
  );
};

export default ToggleAudioButton;
