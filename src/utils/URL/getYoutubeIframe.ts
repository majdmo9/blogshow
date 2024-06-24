export const getYoutubeEmbedIframe = (url: string): string => {
  // Regex to extract video ID from different types of YouTube URLs
  const pattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&?/]+)/;

  const match = url.match(pattern);

  if (match && match[1]) {
    const videoId = match[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return embedUrl;
  } else {
    return "Invalid YouTube URL";
  }
};
