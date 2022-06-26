import React, { useContext } from "react";
import { Modal, ModalBody } from "reactstrap";
import useNetworkQualityLevel from "../../hooks/useNetworkQualityLevel";
import { VideoContext } from "../../context/VideoContext";
import NetworkQuality from "./NetworkQuality";
import AudioLevel from "./AudioLevel";
import usePublications from "../../hooks/usePublications";
import useTrack from "../../hooks/useTrack";

const Settings = ({ isSettingsOpen, toggle }) => {
  const {
    room: { localParticipant },
  } = useContext(VideoContext);
  const networkQualityLevel = useNetworkQualityLevel(localParticipant);
  const publications = usePublications(localParticipant);
  const audioPublication = publications.find((publication) => publication.kind === "audio");
  const audioTrack = useTrack(audioPublication);

  return (
    <div>
      <Modal isOpen={isSettingsOpen} toggle={toggle} fade={false}>
        <ModalBody className="p-2" style={{ fontSize: "14px" }}>
          <NetworkQuality networkQualityLevel={networkQualityLevel} />
          <hr className="mt-2 mb-2" />
          <AudioLevel audioTrack={audioTrack} />
          <hr className="mt-2 mb-2" />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Settings;
