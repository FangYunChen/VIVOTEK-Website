export function convertToYoutubeEmbedUrl(videoUrl: string) {
  if (videoUrl.split('v=').length > 1) {
    videoUrl = videoUrl.split('v=')[1].split('&')[0];
  }
  if (videoUrl.split('/v/').length > 1) {
    videoUrl = videoUrl.split('/v/')[1].split('&')[0];
  }
  if (videoUrl.split('youtu.be/').length > 1) {
    videoUrl = videoUrl.split('youtu.be/')[1].split('&')[0];
  }
  return `https://www.youtube.com/embed/${videoUrl}`;
}
