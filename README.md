# all-games

This folder contains a simple static frontend that lists 16 games as cards (two per row) and includes a voting form at the bottom.

Files added:

- `index.html` — main page containing the cards and form
- `styles.css` — styling for layout and form
- `script.js` — supplies 16 placeholder games, renders cards, and wires the vote form so it opens a pre-filled email to `andrewrubio@microsoft.com`

How it works

- The game list is populated from a `games` array in `script.js`. Each card contains an image, title, team name and links to the game's URL. The whole card is clickable and opens the URL in a new tab.
- The voting form contains:
	- "Your Team" — select your team
	- "First Vote", "Second Vote", "Third Vote" — cascading dropdowns that exclude choices already selected (and exclude "Your Team").
- On submit, the form creates a `mailto:` link addressed to `andrewrubio@microsoft.com` with the selected values in the email body and opens the user's mail client.

To run locally

1. Open `index.html` in your browser (double-click or serve via a static server).

Optional: serve via a minimal local server (Python):

```bash
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Notes

- Team names and game URLs are placeholders (Team 1 .. Team 16; https://example.com/gameX). Replace in `script.js` with real data as needed.
- If you want server-side email delivery (no user mail client), add a small backend or use a service such as EmailJS, Formspree, or an Azure Function to accept POSTs and send emails.
# all-games