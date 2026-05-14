const video = document.querySelector('[data-product-video]');
const placeholder = document.querySelector('[data-video-placeholder]');
const upload = document.querySelector('[data-video-upload]');

function showVideo(src) {
  if (!src || !video || !placeholder) return;

  video.src = src;
  video.hidden = false;
  placeholder.hidden = true;
}

const params = new URLSearchParams(window.location.search);
const queryVideo = params.get('video');

if (queryVideo) {
  showVideo(queryVideo);
} else if (video?.dataset.defaultVideo) {
  fetch(video.dataset.defaultVideo, { method: 'HEAD' })
    .then((response) => {
      if (response.ok) showVideo(video.dataset.defaultVideo);
    })
    .catch(() => {});
}

upload?.addEventListener('change', (event) => {
  const [file] = event.target.files || [];

  if (!file) return;

  showVideo(URL.createObjectURL(file));
});
