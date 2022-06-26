import React, { useState, Fragment, useContext } from "react";
import { format, parseISO } from "date-fns";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { VideoContext } from "../../context/VideoContext";

const Chat = ({ isChatOpen, toggle }) => {
  const [message, setMessage] = useState("");
  const { sendMessage, chatMessages } = useContext(VideoContext);

  const onChangeMessage = ({ target: { value } }) => {
    setMessage(value);
  };
  const sendChatMessage = () => {
    if (message) {
      sendMessage(message);
      setMessage("");
    }
  };
  return (
    <div>
      <Modal isOpen={isChatOpen} toggle={toggle} fade={false}>
        <ModalHeader className="p-2">Chat Messages</ModalHeader>
        <ModalBody className="p-0 pl-2" style={{ fontSize: "14px" }}>
          {chatMessages.length === 0 && <p>There are no chat messages for this room</p>}
          {chatMessages.map((message, i) => {
            return (
              <Fragment key={i}>
                <p className="mb-1 mt-1">
                  <span className="font-weight-bold">{message.identity}:</span> {message.content}{" "}
                  <span style={{ fontSize: "10px" }}>
                    {format(parseISO(message.sent), "hh:mma")}
                  </span>
                </p>
                <hr className="m-0" />
              </Fragment>
            );
          })}
        </ModalBody>
        <ModalFooter>
          <Input
            style={{ fontSize: "12px" }}
            className="p-0 pl-2"
            type="text"
            placeholder="Send Message"
            value={message}
            onChange={onChangeMessage}
          />
          <Button block onClick={sendChatMessage} className="p-0 brand-button">
            Send
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Chat;
