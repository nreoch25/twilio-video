import { useEffect, useRef } from "react";

const AudioTrack = ({ track }) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    track.attach(element);
    return () => {
      track.detach(element);
    };
  }, [track]);

  return <audio ref={ref} />;
};

export default AudioTrack;
