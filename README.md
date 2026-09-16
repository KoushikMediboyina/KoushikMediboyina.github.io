# Sai Koushik — portfolio

A single-page portfolio in plain HTML, CSS and JavaScript. No build step, no dependencies, so it deploys straight to GitHub Pages.

## Files

```
index.html                  the page
css/style.css               all styles (tokens at the top)
js/main.js                  interactions (portrait, nav, timeline, sheets, copy button)
assets/photo.jpg            portrait
assets/Sai_Koushik_Resume.pdf
assets/favicon.svg
.nojekyll                   tells GitHub Pages to serve files as-is
```

## Run it locally

Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Put it live on GitHub Pages

1. On GitHub, create a new **public** repository named exactly `KoushikMediboyina.github.io`. Leave it empty (no README, no .gitignore).
2. In this folder:

   ```
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/KoushikMediboyina/KoushikMediboyina.github.io.git
   git push -u origin main
   ```

3. On GitHub, open the repository → **Settings** → **Pages**. Under *Build and deployment*, set **Source** to *Deploy from a branch*, pick `main` and `/ (root)`, and save.
4. After about a minute the site is live at **https://koushikmediboyina.github.io**.

Every later `git push` to `main` updates the live site.

If you'd rather use a different repository name (say `portfolio`), the same steps work; the site is then served at `https://koushikmediboyina.github.io/portfolio/`. All paths in the site are relative, so nothing needs to change.

## Updating content

- Text lives in `index.html`; each section is marked with a comment.
- To add a link to a project's code, drop an `<a class="sheet-link">` into that project's `.sheet-block` (there's a comment showing where).
- Replace `assets/Sai_Koushik_Resume.pdf` with a newer PDF whenever the resume changes; keep the filename and the download link keeps working.
- Colours and fonts are CSS custom properties at the top of `css/style.css`.
