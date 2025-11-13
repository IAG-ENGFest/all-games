// Define the 14 games explicitly below. Edit the title, team, url and image fields
// for each entry. Keep exactly 14 objects in this array.
const games = [
  { id: 'game1',  title: 'Game 1',  team: 'Team 1',  url: 'https://example.com/game1',  image: 'https://picsum.photos/seed/game1/800/600' },
  { id: 'game2',  title: 'Game 2',  team: 'Team 2',  url: 'https://example.com/game2',  image: 'https://picsum.photos/seed/game2/800/600' },
  { id: 'game3',  title: 'Game 3',  team: 'Team 3',  url: 'https://example.com/game3',  image: 'https://picsum.photos/seed/game3/800/600' },
  { id: 'game4',  title: 'Game 4',  team: 'Team 4',  url: 'https://example.com/game4',  image: 'https://picsum.photos/seed/game4/800/600' },
  { id: 'game5',  title: 'Game 5',  team: 'Team 5',  url: 'https://example.com/game5',  image: 'https://picsum.photos/seed/game5/800/600' },
  { id: 'game6',  title: 'Game 6',  team: 'Team 6',  url: 'https://example.com/game6',  image: 'https://picsum.photos/seed/game6/800/600' },
  { id: 'game7',  title: 'Game 7',  team: 'Team 7',  url: 'https://example.com/game7',  image: 'https://picsum.photos/seed/game7/800/600' },
  { id: 'game8',  title: 'Game 8',  team: 'Team 8',  url: 'https://example.com/game8',  image: 'https://picsum.photos/seed/game8/800/600' },
  { id: 'game9',  title: 'Game 9',  team: 'Team 9',  url: 'https://example.com/game9',  image: 'https://picsum.photos/seed/game9/800/600' },
  { id: 'game10', title: 'Game 10', team: 'Team 10', url: 'https://example.com/game10', image: 'https://picsum.photos/seed/game10/800/600' },
  { id: 'game11', title: 'Game 11', team: 'Team 11', url: 'https://example.com/game11', image: 'https://picsum.photos/seed/game11/800/600' },
  { id: 'game12', title: 'Game 12', team: 'Team 12', url: 'https://example.com/game12', image: 'https://picsum.photos/seed/game12/800/600' },
  { id: 'game13', title: 'Game 13', team: 'Team 13', url: 'https://example.com/game13', image: 'https://picsum.photos/seed/game13/800/600' },
  { id: 'game14', title: 'Game 14', team: 'Team 14', url: 'https://example.com/game14', image: 'https://picsum.photos/seed/game14/800/600' }
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
    const subject = yourTeam.value + ': ' + encodeURIComponent('IAG ENGFest Mini-Hack Votes');
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

// -- Voting results table -----------------------------------------------
const resultsTableBody = document.querySelector('#resultsTable tbody');
const votesHeader = document.getElementById('votesHeader');

// Editable votes data: provide one number per game (index corresponds to games[])
// Edit only the numbers in this array to update vote counts.
const votesData = [
  0, 0, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 0,
  0, 0
];

// Build the `results` array from games and votesData so team names are authoritative
let results = games.map((g, i) => ({ team: g.team, votes: (votesData[i] != null ? Number(votesData[i]) : 0) }));

if(votesData.length !== games.length){
  console.warn(`votesData length (${votesData.length}) does not match games length (${games.length}). Missing entries will be treated as 0.`);
}

let sortDesc = true; // default sort by descending votes

function getTopTwoFromResults(){
  const copy = results.slice().sort((a,b)=>b.votes - a.votes);
  return [copy[0] || null, copy[1] || null];
}

function renderResults(){
  if(!resultsTableBody) return;
  // ensure results reflect current games and votesData (in case games changed)
  results = games.map((g, i) => ({ team: g.team, votes: (votesData[i] != null ? Number(votesData[i]) : 0) }));

  // determine top two by votes (highest)
  const [top1, top2] = getTopTwoFromResults();

  // sort according to current sort order for display
  const display = results.slice().sort((a,b)=> sortDesc ? b.votes - a.votes : a.votes - b.votes);

  // clear
  resultsTableBody.innerHTML = '';
  display.forEach(row => {
    const tr = document.createElement('tr');
    const tdTeam = document.createElement('td');
    const tdVotes = document.createElement('td');

    // badge for top1/top2
    if(top1 && row.team === top1.team){
      const span = document.createElement('span');
      span.className = 'trophy';
      span.textContent = '🏆';
      tdTeam.appendChild(span);
      tdTeam.classList.add('top1');
    } else if(top2 && row.team === top2.team){
      const span = document.createElement('span');
      span.className = 'medal';
      span.textContent = '🥈';
      tdTeam.appendChild(span);
      tdTeam.classList.add('top2');
    }

    const teamText = document.createTextNode(row.team);
    tdTeam.appendChild(teamText);
    tdVotes.textContent = String(row.votes);

    tr.appendChild(tdTeam);
    tr.appendChild(tdVotes);
    resultsTableBody.appendChild(tr);
  });
}

function sortResults(){
  renderResults();
  // update header arrow
  if(votesHeader){
    votesHeader.textContent = `Votes ${sortDesc ? '▾' : '▴'}`;
  }
}

if(votesHeader){
  votesHeader.addEventListener('click', ()=>{
    sortDesc = !sortDesc;
    sortResults();
  });
}

// initial render
sortResults();
