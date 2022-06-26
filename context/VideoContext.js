import { createContext, useState, useEffect } from "react";
import axios from "axios";
import useLocalTracks from "../hooks/useLocalTracks";
import useRoom from "../hooks/useRoom";
import useSelectedParticipant from "../hooks/useSelectedParticipant";
import useChatFeature from "../hooks/useChatFeature";

export const VideoContext = createContext(null);

const VideoContextProvider = ({ options, children }) => {
  // const [chatMessages, setChatMessages] = useState([]);
  const { localTracks, getLocalVideoTrack } = useLocalTracks();
  const { room, connect } = useRoom(localTracks, options);
  const { selectedParticipant, toggleSelectedParticipant } = useSelectedParticipant(room);
  const { sendMessage, chatMessages, updateChatMessages } = useChatFeature(room);

  const getToken = async (identity, room) => {
    try {
      const { data } = await axios.get(`/api/token?identity=${identity}&room=${room}`);
      return data;
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <VideoContext.Provider
      value={{
        getToken,
        connect,
        room,
        localTracks,
        getLocalVideoTrack,
        selectedParticipant,
        toggleSelectedParticipant,
        sendMessage,
        chatMessages,
        updateChatMessages,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContextProvider;
