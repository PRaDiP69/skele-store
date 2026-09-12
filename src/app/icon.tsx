import { ImageResponse } from "next/og";

export const size = {
  width: 192,
  height: 192,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 32,
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontFamily: "monospace",
          fontWeight: 900,
          letterSpacing: "0.2em",
          border: "2px solid #27272a",
        }}
      >
        SKL
      </div>
    ),
    {
      ...size,
    }
  );
}