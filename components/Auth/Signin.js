import { useContext, useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import { Card, CardHeader, CardBody, Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import { VideoContext } from "../../context/VideoContext";
import LocalPreview from "../Video/LocalPreview";

const Signin = () => {
  const router = useRouter();
  const { getToken, connect } = useContext(VideoContext);
  const [state, setState] = useState({ name: "", room: "" });
  const [formDisabled, setFormDisabled] = useState(false);

  useEffect(() => {
    const { query } = router;
    if (query.room && query.name) {
      setState({ name: query.name, room: query.room });
      setFormDisabled(true);
    }
  }, [router]);

  const handleChange = ({ target: { value, name } }) => {
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const { name, room } = state;
    const { token } = await getToken(name, room);
    await connect(token);
    router.push("/room");
  };

  return (
    <Fragment>
      <Row className="mt-3">
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <Card>
            <CardHeader tag="h4" className="text-center font-weight-bold p-2">
              Join Room
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Input
                    type="text"
                    name="name"
                    value={state.name}
                    placeholder="Name"
                    onChange={handleChange}
                    disabled={formDisabled}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    name="room"
                    value={state.room}
                    placeholder="Room"
                    onChange={handleChange}
                    disabled={formDisabled}
                  />
                </FormGroup>
                <Button type="submit" className="brand-button" block>
                  Join Room
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <LocalPreview />
        </Col>
      </Row>
    </Fragment>
  );
};
export default Signin;
