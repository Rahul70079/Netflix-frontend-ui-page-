// simple search filter
const searchInput = document.querySelector(".search-bar input");
const videos = document.querySelectorAll(".video-card");

searchInput.addEventListener("input", () => {
  const val = searchInput.value.toLowerCase();
  videos.forEach(video => {
    const title = video.querySelector("h3").innerText.toLowerCase();
    video.style.display = title.includes(val) ? "block" : "none";
  });
});
