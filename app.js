const $ = (selector) => document.querySelector(selector);

function youtubeSearch(song) {
  if (song.youtube_url) return song.youtube_url;
  const query = encodeURIComponent(`${song.artist} ${song.title} official video`);
  return `https://www.youtube.com/results?search_query=${query}`;
}

function formatDate(value, long = false) {
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat('de-DE', {
    weekday: long ? 'long' : undefined,
    day: '2-digit',
    month: long ? 'long' : 'short',
    year: 'numeric',
  }).format(date);
}

function addFact(container, text) {
  const item = document.createElement('span');
  item.textContent = text;
  container.append(item);
}

function renderCurrent(song) {
  $('#song-date').textContent = formatDate(song.date, true);
  $('#song-title').textContent = song.title;
  $('#song-artist').textContent = song.artist;
  $('#record-year').textContent = song.release_year;
  $('#youtube-link').href = youtubeSearch(song);

  const facts = $('#song-facts');
  facts.replaceChildren();
  addFact(facts, String(song.release_year));
  addFact(facts, `DE #${song.de_peak}`);
  addFact(facts, `UK #${song.uk_peak}`);
  addFact(facts, `USA #${song.us_peak}`);
}

function renderArchive(songs) {
  const list = $('#song-list');
  const empty = $('#archive-empty');
  list.replaceChildren();
  empty.hidden = songs.length > 0;

  songs.forEach((song, index) => {
    const row = document.createElement('li');
    const number = document.createElement('span');
    const copy = document.createElement('div');
    const title = document.createElement('strong');
    const artist = document.createElement('span');
    const date = document.createElement('time');
    const link = document.createElement('a');

    number.className = 'track-number';
    number.textContent = String(index + 1).padStart(2, '0');
    copy.className = 'track-copy';
    title.textContent = song.title;
    artist.textContent = `${song.artist} · ${song.release_year}`;
    copy.append(title, artist);
    date.dateTime = song.date;
    date.textContent = formatDate(song.date);
    link.href = youtubeSearch(song);
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.textContent = 'Anhören ↗';
    row.append(number, copy, date, link);
    list.append(row);
  });
}

async function loadSongs() {
  try {
    const response = await fetch(`songs.json?v=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const songs = await response.json();
    if (!Array.isArray(songs) || songs.length === 0) throw new Error('Keine Songs vorhanden');
    songs.sort((a, b) => b.date.localeCompare(a.date));
    renderCurrent(songs[0]);
    renderArchive(songs.slice(1, 31));
  } catch (error) {
    console.error(error);
    $('#song-title').textContent = 'Heute bleibt die Nadel kurz stehen.';
    $('#song-artist').textContent = '';
    $('#song-facts').replaceChildren();
    $('#youtube-link').hidden = true;
    $('#load-error').hidden = false;
    $('#archive-empty').hidden = false;
  }
}

loadSongs();
