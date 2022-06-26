import { Fragment } from "react";
import { Progress } from "reactstrap";

const NetworkQuality = ({ networkQualityLevel }) => {
  return (
    <Fragment>
      <h6 className="mb-1">Network Quality Level</h6>
      {networkQualityLevel === 1 && <Progress value={20} color="danger" />}
      {networkQualityLevel === 2 && <Progress value={40} color="warning" />}
      {networkQualityLevel === 3 && <Progress value={60} color="primary" />}
      {networkQualityLevel === 4 && <Progress value={80} color="info" />}
      {networkQualityLevel === 5 && <Progress value={100} color="success" />}
    </Fragment>
  );
};

export default NetworkQuality;
