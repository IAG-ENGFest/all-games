// Define the 16 games explicitly below. Edit the title, team, url and image fields
// for each entry. Keep exactly 16 objects in this array.
const games = [
  { id: 'game1',  title: 'Mini-Game 1',  team: 'Team 1',  url: 'https://example.com/game1',  image: 'https://picsum.photos/seed/game1/800/600' },
  { id: 'game2',  title: 'Mini-Game 2',  team: 'Team 2',  url: 'https://example.com/game2',  image: 'https://picsum.photos/seed/game2/800/600' },
  { id: 'game3',  title: 'Mini-Game 3',  team: 'Team 3',  url: 'https://example.com/game3',  image: 'https://picsum.photos/seed/game3/800/600' },
  { id: 'game4',  title: 'Mini-Game 4',  team: 'Team 4',  url: 'https://example.com/game4',  image: 'https://picsum.photos/seed/game4/800/600' },
  { id: 'game5',  title: 'Mini-Game 5',  team: 'Team 5',  url: 'https://example.com/game5',  image: 'https://picsum.photos/seed/game5/800/600' },
  { id: 'game6',  title: 'Mini-Game 6',  team: 'Team 6',  url: 'https://example.com/game6',  image: 'https://picsum.photos/seed/game6/800/600' },
  { id: 'game7',  title: 'Mini-Game 7',  team: 'Team 7',  url: 'https://example.com/game7',  image: 'https://picsum.photos/seed/game7/800/600' },
  { id: 'game8',  title: 'Mini-Game 8!',  team: 'Team 8',  url: 'https://example.com/game8',  image: 'https://picsum.photos/seed/game8/800/600' },
  { id: 'game9',  title: 'Mini-Game 9',  team: 'Team 9',  url: 'https://example.com/game9',  image: 'https://picsum.photos/seed/game9/800/600' },
  { id: 'game10', title: 'Mini-Game 10', team: 'Team 10', url: 'https://example.com/game10', image: 'https://picsum.photos/seed/game10/800/600' },
  { id: 'game11', title: 'Mini-Game 11', team: 'Team 11', url: 'https://example.com/game11', image: 'https://picsum.photos/seed/game11/800/600' },
  { id: 'game12', title: 'Mini-Game 12', team: 'Team 12', url: 'https://example.com/game12', image: 'https://picsum.photos/seed/game12/800/600' },
  { id: 'game13', title: 'Mini-Game 13', team: 'Team 13', url: 'https://example.com/game13', image: 'https://picsum.photos/seed/game13/800/600' },
  { id: 'game14', title: 'Mini-Game 14', team: 'Team 14', url: 'https://example.com/game14', image: 'https://picsum.photos/seed/game14/800/600' },
  { id: 'game15', title: 'Mini-Game 15', team: 'Team 15', url: 'https://example.com/game15', image: 'https://picsum.photos/seed/game15/800/600' },
  { id: 'game16', title: 'Mini-Game 16', team: 'Team 16', url: 'https://example.com/game16', image: 'https://picsum.photos/seed/game16/800/600' }
];

const gamesContainer = document.getElementById('games');
const yourTeam = document.getElementById('yourTeam');
const firstVote = document.getElementById('firstVote');
const secondVote = document.getElementById('secondVote');
const thirdVote = document.getElementById('thirdVote');
const voteForm = document.getElementById('voteForm');

function createCard(game){
  const a = document.createElement('a');
  a.className='card';
  a.href = game.url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';

  const img = document.createElement('img');
  img.src = game.image;
  img.alt = game.title;
  img.className='thumb';

  const meta = document.createElement('div');
  meta.className='meta';

  const t = document.createElement('div');
  t.className='title';
  t.textContent = game.title;

  const team = document.createElement('div');
  team.className='team';
  team.textContent = game.team;

//   const link = document.createElement('div');
//   link.className = 'link';
//   link.textContent = 'Play →';
//   link.style.marginTop = '6px';
//   link.style.color = '#9fb8ff';

  meta.appendChild(t);
  meta.appendChild(team);
//   meta.appendChild(link);

  a.appendChild(img);
  a.appendChild(meta);
  return a;
}

function renderGames(){
  games.forEach(g=>{
    const card = createCard(g);
    gamesContainer.appendChild(card);
  });
}

function populateSelect(selectEl, options, placeholder, preserve = true){
  // Populate a select element with options. If preserve is true, keep current value if still available.
  if(!selectEl) return;
  const current = selectEl.value;
  // remove all options
  while(selectEl.firstChild) selectEl.removeChild(selectEl.firstChild);
  const ph = document.createElement('option');
  ph.value='';
  ph.textContent = placeholder || '-- select --';
  selectEl.appendChild(ph);
  options.forEach(opt=>{
    const o = document.createElement('option');
    o.value = opt;
    o.textContent = opt;
    selectEl.appendChild(o);
  });
  if(preserve && current){
    // restore if still valid
    const exists = options.indexOf(current) !== -1;
    if(exists) selectEl.value = current;
    else selectEl.value = '';
  } else {
    selectEl.value = '';
  }
}

function teamList(){
  return games.map(g=>g.team);
}

function updateVoteOptions(){
  const teams = teamList();
  const your = yourTeam ? yourTeam.value : '';
  // first: exclude your
  populateSelect(firstVote, teams.filter(t=>t!==your), '-- select first vote --', true);

  // second: exclude your and first
  const first = firstVote ? firstVote.value : '';
  populateSelect(secondVote, teams.filter(t=>t!==your && t!==first), '-- select second vote --', true);

  // third: exclude your, first, second
  const second = secondVote ? secondVote.value : '';
  populateSelect(thirdVote, teams.filter(t=>t!==your && t!==first && t!==second), '-- select third vote --', true);
}

function initForm(){
  populateSelect(yourTeam, teamList(), '-- select your team --');
  populateSelect(firstVote, teamList(), '-- select first vote --');
  populateSelect(secondVote, teamList(), '-- select second vote --');
  populateSelect(thirdVote, teamList(), '-- select third vote --');

  yourTeam.addEventListener('change',()=>{
    // when your team changes we must ensure votes don't include it; clear lower-tier votes
    if(firstVote) firstVote.value='';
    if(secondVote) secondVote.value='';
    if(thirdVote) thirdVote.value='';
    updateVoteOptions();
  });

  firstVote.addEventListener('change',()=>{
    // when first changes, clear second/third selections (they may now be invalid)
    if(secondVote) secondVote.value='';
    if(thirdVote) thirdVote.value='';
    updateVoteOptions();
  });

  secondVote.addEventListener('change',()=>{
    // when second changes, clear third
    if(thirdVote) thirdVote.value='';
    updateVoteOptions();
  });

  voteForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const yt = yourTeam.value;
    const v1 = firstVote.value;
    const v2 = secondVote.value;
    const v3 = thirdVote.value;

    if(!yt || !v1 || !v2 || !v3){
      alert('Please choose your team and three distinct votes.');
      return;
    }

    // final validation: ensure distinct and not equal to your team
    const chosen = [v1,v2,v3];
    const unique = new Set(chosen);
    if(chosen.includes(yt) || unique.size !== 3){
      alert('Votes must be three distinct teams and not your team.');
      return;
    }

    const to = 'andrewrubio@microsoft.com';
    const subject = encodeURIComponent('IAG ENGFest Mini-Hack Votes');
    const bodyLines = [
      `Your Team: ${yt}`,
      `First Vote: ${v1}`,
      `Second Vote: ${v2}`,
      `Third Vote: ${v3}`,
      '',
      'Submitted from IAG ENGFest Mini-Hack Games site.'
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

    // open mail client
    window.location.href = mailto;
  })
}

// Initialize page
renderGames();
initForm();
