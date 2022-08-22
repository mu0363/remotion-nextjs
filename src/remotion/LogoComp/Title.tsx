import { useSelector } from "react-redux";
import { interpolate } from "remotion";
import { useCurrentFrame } from "remotion";
import { selectAllText } from "../../store/features/firstPageSlice";
import type { FC } from "react";

export const Title: FC = () => {
  const firstPageData = useSelector(selectAllText);
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        fontSize: "3rem",
        fontWeight: "bold",
        color: "#374151",
        marginTop: 36,
        fontFamily: "Helvetica",
      }}
    >
      {firstPageData.title}
    </div>
  );
};
