import { Jumbotron } from "reactstrap";
import ToggleScreenShareButton from "./ToggleScreenShareButton";
import ToggleFullScreenButton from "./ToggleFullScreenButton";
import ToggleAudioButton from "./ToggleAudioButton";
import ToggleVideoButton from "./ToggleVideoButton";
import ToggleChatModalButton from "./ToggleChatModalButton";
import ToggleSettingsButton from "./ToggleSettingsButton";

const Controls = () => {
  return (
    <Jumbotron className="p-2 mb-0 controls">
      <ToggleSettingsButton />
      <ToggleScreenShareButton />
      <ToggleFullScreenButton />
      <ToggleAudioButton />
      <ToggleVideoButton />
      <ToggleChatModalButton />
    </Jumbotron>
  );
};

export default Controls;
