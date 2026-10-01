# Nihal-Kazi
Portfolio website for **Rakibul Islam**, web developer (WordPress, React.js, Next.js, HTML, CSS, JavaScript, Tailwind CSS, PHP).
It's a single page in the style of a modern design agency site.
Plain HTML, CSS and JavaScript: nothing to install, no build step.

## Structure

```
index.html            All page content and sections
assets/css/style.css  Styles (colors and fonts are variables at the top)
assets/js/projects.js List of portfolio projects (edit this to add or remove sites)
assets/js/main.js     Menu, scroll animations, project cards and filter, contact form
assets/img/projects/  Website screenshots for the project cards
scripts/screenshot.mjs  Takes those screenshots (run by GitHub Actions)
assets/img/brand/     Logo files (SVG + PNG) and app icons
```

## Preview locally

Open `index.html` in a browser.

## Things to personalize

Some content is placeholder text you should replace:

- **Contact email:** `CONTACT_EMAIL` at the top of `assets/js/main.js`. The contact form opens the visitor's email app addressed to it. The email and social links also appear in the contact section and footer of `index.html`.
- **Projects:** edit `assets/js/projects.js`. Each line is one website (name, URL, description, filter categories, tag).
  Screenshots live in `assets/img/projects/<domain>.jpg` (for example `piximdesign-com.jpg`). The **Project screenshots** GitHub Action (`.github/workflows/screenshots.yml`) creates them automatically whenever `projects.js` changes, taking a picture only of sites that don't have one yet. To retake all of them, open **Actions → Project screenshots → Run workflow** and tick "Retake every screenshot". If an image is missing, the page falls back to a live screenshot from WordPress mShots. To use your own picture for a site, add `image: "assets/img/projects/name.jpg"` to that project.
- **Stats** (hero): change the `data-count` numbers.
- **Skills** (`#skills`): edit the cards to add or remove technologies. The logos are inline SVGs from [Simple Icons](https://simpleicons.org/) (CC0). To add one, copy the `path` from that icon's SVG and set the card's `--c` colour.
- **Testimonials:** replace "Client Name" and the quotes with real client feedback.
- **About photo:** `assets/img/rakibul-islam.webp` (transparent background). Replace that file to change the photo.
- **Logo:** the "Ri" mark and wordmark live in `assets/img/brand/`:
  - `logo-mark.svg` / `logo-mark-512.png`: the square icon, also used as the favicon
  - `logo-dark.svg` / `logo-dark.png`: icon plus name, for dark backgrounds
  - `logo-light.svg` / `logo-light.png`: icon plus name, for light backgrounds
  - `apple-touch-icon.png`: the icon iPhones use when the site is added to the home screen

  The nav and footer use an inline, animated copy of the mark in `index.html`.
- **Colors:** change `--accent` and `--violet` in `:root` at the top of `style.css`.

## Publish with GitHub Pages

1. Go to the repository's **Settings → Pages**.
2. Under **Build and deployment**, pick **Deploy from a branch**, choose the branch and the `/ (root)` folder, then save.
3. After a minute the site is live at `https://<username>.github.io/Nihal-Kazi/`.
