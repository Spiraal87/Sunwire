import { Composition } from "remotion";
import { MissedCallsAd } from "./MissedCallsAd";
import { MissedCallsAdFull, TOTAL_FRAMES } from "./MissedCallsAdFull";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MissedCallsAd"
        component={MissedCallsAd}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="MissedCallsAdFull"
        component={MissedCallsAdFull}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
