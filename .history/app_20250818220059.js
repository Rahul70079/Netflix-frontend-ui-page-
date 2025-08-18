const videoGrid = document.getElementById('videoGrid');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const chips = document.getElementById('chips');
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menuBtn');

const playerModal = document.getElementById('playerModal');
const playerFrame = document.getElementById('playerFrame');
const playerTitle = document.getElementById('playerTitle');
const playerMeta = document.getElementById('playerMeta');

// Mock data (you can expand freely)
const videos = [
  { id: 'v1', title: 'Best Lo-Fi Beats to Study', channel: 'ChillHop', views: '2.3M', age: '1 year ago', tag:'music', embed:'https://www.youtube.com/embed/5qap5aO4i9A' },
  { id: 'v2', title: 'Insane FPS Gameplay Highlights', channel: 'ProGamer', views: '980K', age: '2 weeks ago', tag:'gaming', embed:'https://www.youtube.com/embed/7sDY4m8KNLc' },
  { id: 'v3', title: 'JavaScript in 15 Minutes', channel: 'CodeWithMe', views: '1.2M', age: '3 months ago', tag:'coding', embed:'https://www.youtube.com/embed/2Ji-clqUYnA' },
  { id: 'v4', title: 'Today’s Tech News Recap', channel: 'TechNow', views: '450K', age: '1 day ago', tag:'news', embed:'https://www.youtube.com/embed/ysz5S6PUM-U' },
  { id: 'v5', title: 'React Context API Crash Course', channel: 'FrontendHub', views: '720K', age: '5 days ago', tag:'coding', embed:'https://www.youtube.com/embed/35lXWvCuM8o' },
  { id: 'v6', title: 'Top 10 Football Goals 2025', channel: 'GoalRush', views: '3.1M', age: '6 days ago', tag:'sports', embed:'https://www.youtube.com/embed/aqz-KE-bpKQ' },
  { id: 'v7', title: 'Relaxing Nature Sounds 4K', channel: 'ZenWorld', views: '5.4M', age: '2 years ago', tag:'music', embed:'https://www.youtube.com/embed/1ZYbU82GVz4' },
  { id: 'v8', title: 'Speedrun Any% World Record!', channel: 'Speedster', views: '812K', age: '4 days ago', tag:'gaming', embed:'https://www.youtube.com/embed/9bZkp7q19f0' }
];

let currentChip = 'all';

function renderCards(list){
  videoGrid.innerHTML = '';
  list.forEach(v => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb">16:9</div>
      <div class="meta">
        <div class="channel">${v.channel[0]}</div>
        <div>
          <div class="title">${v.title}</div>
          <div class="sub">${v.channel} • ${v.views} views • ${v.age}</div>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openPlayer(v));
    videoGrid.appendChild(card);
  })
}

function filterVideos(){
  const q = searchInput.value.trim().toLowerCase();
  const filtered = videos.filter(v => {
    const byChip = currentChip === 'all' ? true : v.tag === currentChip;
    const byText = v.title.toLowerCase().includes(q) || v.channel.toLowerCase().includes(q);
    return byChip && byText;
  });
  renderCards(filtered);
}

searchForm.addEventListener('submit', (e)=>{ e.preventDefault(); filterVideos(); });
searchInput.addEventListener('input', filterVideos);

chips.addEventListener('click', (e)=>{
  const btn = e.target.closest('.chip');
  if(!btn) return;
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');
  currentChip = btn.dataset.chip;
  filterVideos();
})

menuBtn.addEventListener('click', ()=>{
  sidebar.classList.toggle('collapsed');
  // Collapse style via inline to keep single CSS file minimal
  if(sidebar.classList.contains('collapsed'))
      sidebar.style.width = '64px';
  } else {
    sidebar.style.width = '';
  }
};

function openPlayer(v){
  playerTitle.textContent = v.title;
  playerMeta.textContent = `${v.channel} • ${v.views} views • ${v.age}`;
  playerFrame.src = v.embed + '?autoplay=1&rel=0';
  playerModal.classList.add('show');
  playerModal.setAttribute('aria-hidden','false');
}

function closePlayer(){
  playerFrame.src = '';
  playerModal.classList.remove('show');
  playerModal.setAttribute('aria-hidden','true');
}

playerModal.addEventListener('click', (e)=>{
  if(e.target.hasAttribute('data-close')) closePlayer();
});
playerModal.querySelector('.close').addEventListener('click', closePlayer);

// Initial render
renderCards(videos);
