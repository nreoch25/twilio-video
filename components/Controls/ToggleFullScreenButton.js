import { Button } from "reactstrap";
import { faCompress, faCompressArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFullScreenToggle from "../../hooks/useFullScreenToggle";

const ToggleFullScreenButton = (props) => {
  const [isFullScreen, toggleFullScreen] = useFullScreenToggle();

  return (
    <Button onClick={toggleFullScreen} className="ml-2 brand-button p-1 pr-2 pl-2">
      {isFullScreen ? (
        <FontAwesomeIcon icon={faCompressArrowsAlt} size="1x" />
      ) : (
        <FontAwesomeIcon icon={faCompress} size="1x" />
      )}
    </Button>
  );
};

export default ToggleFullScreenButton;
