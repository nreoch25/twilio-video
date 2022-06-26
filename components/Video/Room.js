import { useContext, useState, Fragment } from "react";
import { VideoContext } from "../../context/VideoContext";
import { Row, Col, Collapse, Button } from "reactstrap";
import useParticipants from "../../hooks/useParticipants";
import Participant from "./Participant";
import MainParticipant from "./MainParticipant";
import Controls from "../Controls";

const Room = () => {
  const [isOpen, setIsOpen] = useState(true);
  const {
    room: { localParticipant },
  } = useContext(VideoContext);
  const participants = useParticipants();

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Fragment>
      <Row className="mt-2">
        <Col md="12" lg="2" className="mb-2 p-0">
          <Button onClick={toggle} block color="primary" className="p-0 rounded-0 d-lg-none">
            {isOpen ? "Hide Participants" : "Show Participants"}
          </Button>
          <Collapse isOpen={isOpen}>
            <Row noGutters>
              <Col xs="4" lg="12">
                <Participant participant={localParticipant} />
              </Col>

              {participants.map((participant) => {
                return (
                  <Col xs="4" lg="12" key={participant.identity}>
                    <Participant key={participant.sid} participant={participant} />
                  </Col>
                );
              })}
            </Row>
          </Collapse>
        </Col>

        <Col md="12" lg="10" className="p-0">
          <MainParticipant />
        </Col>
      </Row>
      <Controls />
    </Fragment>
  );
};
export default Room;
