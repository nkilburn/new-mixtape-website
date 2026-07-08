# Made You A Mixtape — Website

A multi-page site for the podcast, built with plain HTML/CSS/JS (no build step required).

## Structure
```
index.html          Home
episodes.html        Full episode archive
about.html            About the show
blog.html               Liner notes / blog
contact.html         Contact + song suggestion + newsletter forms
assets/css/style.css      All styles (design tokens at the top)
assets/js/main.js           Nav toggle, cassette player logic, form handling
assets/feed.xml               RSS feed (placeholder episode data)
```

## Before going live
1. **Swap placeholder audio.** Every `<audio><source src="...soundhelix...">` tag (in `index.html`, `episodes.html`, and `assets/feed.xml`) points to a free demo track. Replace with your real episode MP3 URLs.
2. **Wire up the forms.** The contact/suggestion/newsletter forms in `contact.html`, `index.html`, `about.html`, and `blog.html` are front-end only right now — they show a success message but don't send anywhere. Point them at a form backend (e.g. Formspree, Basin, or your own endpoint) by adding an `action` and `method` to each `<form>` tag.
3. **Update `assets/feed.xml`** with real episode data, then submit that URL to Apple Podcasts/Spotify once it's live at its permanent URL.
4. Replace the placeholder Unsplash photos (in `index.html`, `about.html`, `blog.html`) with your own images if you'd like.

## Hosting on GitHub Pages
All paths are relative, so this works with no changes whether you host at:
- a custom domain / repo root, or
- `https://nkilburn.github.io/new-mixtape-website/` (project Pages subpath)

To enable: **Settings → Pages → Source → Deploy from branch → main → / (root)**.
