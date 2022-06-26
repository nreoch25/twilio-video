import { useState, useEffect } from "react";

const useSelectedParticipant = (room) => {
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const toggleSelectedParticipant = (participant) => {
    setSelectedParticipant((prev) => (prev === participant ? null : participant));
  };

  useEffect(() => {
    const onDisconnect = () => setSelectedParticipant(null);
    if (room) {
      room.on("disconnected", onDisconnect);
    }

    return () => {
      if (room) {
        room.off("disconnected", onDisconnect);
      }
    };
  }, [room]);

  return { selectedParticipant, toggleSelectedParticipant };
};

export default useSelectedParticipant;
