import { useEffect, useState, useContext } from "react";
import { VideoContext } from "../context/VideoContext";

const usePublications = (participant) => {
  const [publications, setPublications] = useState([]);
  const { updateChatMessages } = useContext(VideoContext);

  useEffect(() => {
    setPublications(Array.from(participant.tracks.values()));

    const publicationAdded = (publication) => {
      setPublications((prev) => [...prev, publication]);
    };
    const publicationRemoved = (publication) => {
      setPublications((prev) => prev.filter((p) => p !== publication));
    };
    const dataTrackSubscribed = (track) => {
      if (track.kind === "data") {
        track.on("message", (message) => {
          console.log("MESSAGE RECEIVED IN ON EVENT", message);
          updateChatMessages(message);
        });
      }
    };
    participant.on("trackPublished", publicationAdded);
    participant.on("trackSubscribed", dataTrackSubscribed);
    participant.on("trackUnpublished", publicationRemoved);

    return () => {
      participant.off("trackPublished", publicationAdded);
      participant.off("trackSubscribed", dataTrackSubscribed);
      participant.off("trackUnpublished", publicationRemoved);
    };
  }, [participant]);

  return publications;
};

export default usePublications;
