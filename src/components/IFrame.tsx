import { getYoutubeEmbedIframe } from "@/utils/URL/getYoutubeIframe";
import React from "react";

interface Props {
  url: string;
}

const IFrame = ({ url }: Props) => {
  return (
    <iframe
      width="560"
      height="315"
      src={getYoutubeEmbedIframe(url)}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className="rounded-sm w-full"
    ></iframe>
  );
};

export default IFrame;
