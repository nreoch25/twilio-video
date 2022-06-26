import { useReducer, Fragment } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "reactstrap";
import LocalPreview from "../Video/LocalPreview";

const TYPES = ["sms", "email"];

const INITIAL_STATE = {
  room: "",
  name: "",
  type: "sms",
  number: "",
  email: "",
  error: "",
  success: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FORM":
      const { name, value } = action.payload;
      return { ...state, [name]: value, error: "", success: "" };
    case "FORM_SUCCESS":
      return { ...INITIAL_STATE, success: action.payload };
    case "FORM_ERROR":
      return { ...state, success: "", error: action.payload };
    default:
      return state;
  }
};

const Invite = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const { room, name, type, number, email, error, success } = state;

  const saveToState = ({ target: { name, value } }) => {
    dispatch({ type: "UPDATE_FORM", payload: { name, value } });
  };

  const handleSMSSubmit = async (evt) => {
    evt.preventDefault();
    const { room, name, number } = state;
    if (!room || !name || !number) {
      return dispatch({ type: "FORM_ERROR", payload: "Please fill out the form!" });
    }
    try {
      await axios.post("/api/sms", {
        room,
        name,
        number,
        baseUrl: `${window.location.protocol}//${window.location.host}`,
      });
      dispatch({
        type: "FORM_SUCCESS",
        payload: `SMS message has been sent successfully to ${name} at ${number}`,
      });
    } catch (error) {
      return dispatch({
        type: "FORM_ERROR",
        payload: `Error sending SMS: ${JSON.stringify(error)}`,
      });
    }
  };

  const handleEmailSubmit = async (evt) => {
    evt.preventDefault();
    const { room, name, email } = state;
    if (!room || !name || !email) {
      return dispatch({ type: "FORM_ERROR", payload: "Please fill out the form!" });
    }
    try {
      await axios.post("/api/email", {
        room,
        name,
        email,
        baseUrl: `${window.location.protocol}//${window.location.host}`,
      });
      dispatch({
        type: "FORM_SUCCESS",
        payload: `Email has been sent successfully to ${name} at ${email}`,
      });
    } catch (error) {
      return dispatch({
        type: "FORM_ERROR",
        payload: `Error sending email: ${JSON.stringify(error)}`,
      });
    }
  };

  return (
    <Fragment>
      <Row className="mt-3 mr-0 ml-0">
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <Card>
            <CardHeader tag="h4" className="text-center font-weight-bold p-2">
              Invite User
            </CardHeader>
            <CardBody>
              <Form onSubmit={type === "sms" ? handleSMSSubmit : handleEmailSubmit}>
                <FormGroup>
                  <Input
                    type="text"
                    name="name"
                    placeholder="User name"
                    value={name}
                    onChange={saveToState}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    name="room"
                    value={room}
                    placeholder="Room name"
                    onChange={saveToState}
                  />
                </FormGroup>
                <FormGroup>
                  <Input type="select" name="type" value={type} onChange={saveToState}>
                    {TYPES.map((sendType, i) => {
                      return (
                        <option value={sendType} key={i}>
                          {sendType}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
                {type === "sms" && (
                  <FormGroup>
                    <Input
                      type="tel"
                      name="number"
                      value={number}
                      placeholder="Telephone number"
                      onChange={saveToState}
                    />
                  </FormGroup>
                )}
                {type === "email" && (
                  <FormGroup>
                    <Input
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Email Address"
                      onChange={saveToState}
                    />
                  </FormGroup>
                )}
                <Button type="submit" block className="brand-button">
                  Send Invitation
                </Button>
              </Form>
            </CardBody>
            {error && (
              <CardFooter>
                <Alert style={{ marginBottom: "0" }} color="danger">
                  {error}
                </Alert>
              </CardFooter>
            )}
            {success && (
              <CardFooter>
                <Alert className="mb-0" color="success">
                  {success}
                </Alert>
              </CardFooter>
            )}
          </Card>
        </Col>
      </Row>
      <Row className="mt-2 mr-0 ml-0">
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <LocalPreview />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Invite;
