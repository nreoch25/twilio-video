import { useContext, Fragment } from "react";
import Room from "../components/Video/Room";
import RoomEmpty from "../components/Video/RoomEmpty";
import Layout from "../components/Layout";
import { VideoContext } from "../context/VideoContext";

const RoomPage = () => {
  const { room } = useContext(VideoContext);
  return (
    <Layout>
      {room ? (
        <Fragment>
          <Room />
        </Fragment>
      ) : (
        <RoomEmpty />
      )}
    </Layout>
  );
};

export default RoomPage;
