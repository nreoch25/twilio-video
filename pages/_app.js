import VideoContextProvider from "../context/VideoContext";

const connectionOptions = {
  bandwidthProfile: {
    video: {
      mode: "collaboration",
      dominantSpeakerPriority: "standard",
      renderDimensions: {
        high: { height: 1080, width: 1920 },
        standard: { height: 720, width: 1280 },
        low: { height: 90, width: 160 },
      },
    },
  },
  dominantSpeaker: true,
  maxAudioBitrate: 12000,
  networkQuality: { local: 1, remote: 1 },
  preferredVideoCodecs: [{ codec: "VP8", simulcast: true }],
};

function MyApp({ Component, pageProps }) {
  return (
    <VideoContextProvider options={connectionOptions}>
      <Component {...pageProps} />
    </VideoContextProvider>
  );
}

export default MyApp;
