import { Fragment, useState } from "react";
import { Button } from "reactstrap";
import { faComment, faCommentSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chat from "../Chat";

const ToggleChatModalButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChatFeature = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <Fragment>
      <Button onClick={toggleChatFeature} className="ml-2 brand-button p-1 pr-2 pl-2">
        {isChatOpen ? (
          <FontAwesomeIcon icon={faCommentSlash} size="1x" />
        ) : (
          <FontAwesomeIcon icon={faComment} size="1x" />
        )}
      </Button>
      <Chat isChatOpen={isChatOpen} toggle={toggleChatFeature} />
    </Fragment>
  );
};

export default ToggleChatModalButton;
