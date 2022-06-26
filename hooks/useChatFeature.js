import { useState, useEffect } from "react";

const useChatFeature = (room) => {
  const [dataTrack, setDataTrack] = useState(null);
  const [identity, setIdentity] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const dataTrackPublished = (publication) => {
      if (publication.kind === "data") {
        setDataTrack(publication.track);
      }
    };

    if (room) {
      room.localParticipant.on("trackPublished", dataTrackPublished);
      setIdentity(room.localParticipant.identity);
    }

    return () => {
      if (room) {
        room.localParticipant.off("trackPublished", dataTrackPublished);
      }
    };
  }, [room]);

  const updateChatMessages = (message) => {
    const newMessage = JSON.parse(message);
    setChatMessages((prev) => {
      const updatedMessages = [...prev, newMessage];
      const unique = Array.from(new Set(updatedMessages.map((message) => message.id)));
      const uniqueMap = unique.map((id) => updatedMessages.find((message) => message.id === id));
      return uniqueMap;
    });
  };

  const sendMessage = (content) => {
    if (dataTrack) {
      const message = JSON.stringify({
        id: Math.floor(Math.random() * 1000000),
        content,
        identity,
        sent: new Date(),
      });

      dataTrack.send(message);
      updateChatMessages(message);
    }
  };

  return { sendMessage, chatMessages, updateChatMessages };
};

export default useChatFeature;
