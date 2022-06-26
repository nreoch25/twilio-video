import { Fragment } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardImg,
  Row,
  Col,
  Button,
  Jumbotron,
} from "reactstrap";

const Index = () => {
  return (
    <Fragment>
      <Row className="mt-3 mr-0 ml-0">
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <Jumbotron className="p-1 pl-5 pr-5 pb-3 mb-3">
            <h1 className="display-5 text-center">Programmable Video Demo</h1>
            <p className="lead">
              This is a fully functioning React application demo for Twilio programmable video. The
              main purpose of this is to have a demo-able product that showcases the available
              features. Features include: Screen sharing, Message chat, Dominant Speaker, Selected
              Speaker, Mute audio and video and more.
            </p>
          </Jumbotron>
        </Col>
      </Row>
      <Row className="mt-3 mr-0 ml-0">
        <Col md={{ size: 4, offset: 2 }} className="d-flex align-items-stretch mb-3">
          <Card>
            <CardHeader tag="h4" className="text-center font-weight-bold p-2">
              Invite Users
            </CardHeader>
            <CardImg src="/images/pic2.jpg" />
            <CardBody className="lead">
              Invite users to a video chat room using SMS and Email. You will be given the option to
              either invite the chat users through email or sms.
            </CardBody>

            <CardFooter>
              <Link href="/invite">
                <Button block className="brand-button">
                  Click to Invite users
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </Col>
        <Col md={{ size: 4 }} className="d-flex align-items-stretch mb-3">
          <Card>
            <CardHeader tag="h4" className="text-center font-weight-bold p-2">
              Join Room
            </CardHeader>
            <CardImg src="/images/pic1.jpg" />
            <CardBody className="lead">
              Join a video chat room by providing your Name and a provided room name.
            </CardBody>

            <CardFooter>
              <Link href="/join">
                <Button block className="brand-button">
                  Click to Join a room
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Index;
