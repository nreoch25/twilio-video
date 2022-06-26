import { Fragment, useEffect, useState, useRef } from "react";
import { Progress } from "reactstrap";
import useIsTrackEnabled from "../../hooks/useIsTrackEnabled";

const initializeAudioAnalyser = (stream) => {
  let AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();
  const audioSource = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  analyser.smoothingTimeConstant = 0.4;
  analyser.fftSize = 512;

  audioSource.connect(analyser);
  return analyser;
};

const AudioLevel = ({ audioTrack }) => {
  const [volume, setVolume] = useState(0);
  const mediaStreamRef = useRef();
  const timerRef = useRef();
  const isTrackEnabled = useIsTrackEnabled(audioTrack);

  useEffect(() => {
    const handleStopped = () => mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    audioTrack.on("stopped", handleStopped);
    return () => {
      audioTrack.off("stopped", handleStopped);
    };
  }, [audioTrack]);

  useEffect(() => {
    if (audioTrack && isTrackEnabled) {
      // Here we create a new MediaStream from a clone of the mediaStreamTrack.
      // A clone is created to allow multiple instances of this component for a single
      // AudioTrack on iOS Safari. It is stored in a ref so that the cloned track can be stopped
      // when the original track is stopped.
      mediaStreamRef.current = new MediaStream([audioTrack.mediaStreamTrack.clone()]);
      let analyser = initializeAudioAnalyser(mediaStreamRef.current);

      const reinitializeAnalyser = () => {
        analyser = initializeAudioAnalyser(mediaStreamRef.current);
      };

      const sampleArray = new Uint8Array(analyser.frequencyBinCount);

      timerRef.current = setInterval(() => {
        analyser.getByteFrequencyData(sampleArray);
        let values = 0;
        const length = sampleArray.length;
        for (let i = 0; i < length; i++) {
          values += sampleArray[i];
        }
        const volume = Math.min(21, Math.max(0, Math.log10(values / length / 3) * 14));
        setVolume(volume);
      }, 200);

      // Here we reinitialize the AnalyserNode on focus to avoid an issue in Safari
      // where the analysers stop functioning when the user switches to a new tab
      // and switches back to the app.
      window.addEventListener("focus", reinitializeAnalyser);

      return () => {
        clearInterval(timerRef.current);
        window.removeEventListener("focus", reinitializeAnalyser);
      };
    }
  }, [audioTrack, isTrackEnabled]);

  return (
    <Fragment>
      <h6 className="mb-1">Audio Level Indicator</h6>
      {isTrackEnabled ? (
        <Progress value={volume * 5} color="success" />
      ) : (
        <p className="mb-0">Your Audio is muted</p>
      )}
    </Fragment>
  );
};

export default AudioLevel;
