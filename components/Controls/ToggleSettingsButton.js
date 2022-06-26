import { useState } from "react";
import { Button } from "reactstrap";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Settings from "../Video/Settings";

const ToggleSettingsButton = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
  return (
    <Button onClick={toggleSettings} className="brand-button p-1 pr-2 pl-2">
      <FontAwesomeIcon icon={faCog} size="1x" />
      <Settings toggle={toggleSettings} isSettingsOpen={isSettingsOpen} />
    </Button>
  );
};

export default ToggleSettingsButton;
