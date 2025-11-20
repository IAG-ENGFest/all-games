# all-games

This folder contains a static frontend that presents the 12 mini-hack games submitted by teams, allows users to vote, and shows voting results.

Files

- `index.html` — main page with game cards, voting form, and results table
- `styles.css` — styling for layout, cards, form, and results
- `script.js` — page logic: games list, form population/validation, mailto submission, results rendering and sorting

What the site does

- Presents each submitted game as a card with image, title and team. Cards open the game's URL in a new tab.
- Voting form at the bottom:
	- `Your Team` — choose your team's game (prevents voting for your own team)
	- `First Vote`, `Second Vote`, `Third Vote` — cascading dropdowns that exclude already-selected choices; users must select three distinct teams
	- Submitting the form opens the user's mail client with a prefilled email addressed to the configured recipients (uses `mailto:`). This is a static front-end implementation — server-side submission is not included.
- Voting Results:
	- A results table shows each team and its vote count.
	- The `Votes` column is sortable by clicking its header (toggles ascending/descending).
	- The top-voted team is highlighted with a trophy icon.

Editable data

- `games` in `script.js` — an array of objects with `id`, `title`, `team`, `url`, and `image`. Edit this to list the real games and teams.
- `votesData` in `script.js` — an array of numbers, one per game (index-aligned with `games`) used to populate the results table. Edit these numbers to reflect vote counts.

How to run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Notes and next steps

- Because the site is static, vote submission uses the user's mail client (`mailto:`). If you want to persist votes centrally (no mail client needed), add a small backend (Node/Express, serverless function) or use a hosted form service (Formspree, EmailJS, etc.).
- If you want votes to be recorded automatically and reflected in the results table, I can add a server endpoint or switch to a client-side storage approach (localStorage) for local testing.
