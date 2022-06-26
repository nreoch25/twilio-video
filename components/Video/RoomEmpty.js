import Link from "next/link";
import { Row, Col, Button, Jumbotron } from "reactstrap";

const RoomEmpty = () => {
  return (
    <Row className="mt-3">
      <Col sm="12" md={{ size: 8, offset: 2 }}>
        <Jumbotron className="p-1 pl-5 pr-5 pb-3 mb-3">
          <h1 className="display-5 text-center">Programmable Video Demo</h1>
          <p className="lead">
            You are currently not connected to a room. Please visit the below link for more
            information about the Programmable Video Demo.
          </p>
          <Link href="/">
            <Button block className="brand-button">
              Click here for more information
            </Button>
          </Link>
        </Jumbotron>
      </Col>
    </Row>
  );
};

export default RoomEmpty;
