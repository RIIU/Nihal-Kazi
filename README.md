# Nihal-Kazi
Portfolio website for **Rakibul Islam**, web developer (WordPress, React.js, Next.js, HTML, CSS, JavaScript, Tailwind CSS, PHP).
It's a single page in the style of a modern design agency site.
Plain HTML, CSS and JavaScript: nothing to install, no build step.

## Structure

```
index.html            All page content and sections
assets/css/style.css  Styles (colors and fonts are variables at the top)
assets/js/main.js     Menu, scroll animations, project filter, contact form
```

## Preview locally

Open `index.html` in a browser.

## Things to personalize

Some content is placeholder text you should replace:

- **Contact email:** set `CONTACT_EMAIL` at the top of `assets/js/main.js`. The contact form opens the visitor's email app addressed to it.
- **Projects** (`#work` in `index.html`): replace the four sample projects with real work. Each card has a `data-cat` (`wordpress`, `react`, `php`) used by the filter buttons.
- **Stats** (hero): change the `data-count` numbers.
- **Skills** (`#skills`): edit the cards to add or remove technologies.
- **Testimonials:** replace "Client Name" and the quotes with real client feedback.
- **About:** to use a real photo, replace the `<div class="avatar">…</div>` block with `<img class="avatar" src="assets/img/photo.jpg" alt="Rakibul Islam">`.
- **Social links** in the footer: replace the `#` links for LinkedIn, Facebook and Fiverr.
- **Colors:** change `--accent` and `--violet` in `:root` at the top of `style.css`.

## Publish with GitHub Pages

1. Go to the repository's **Settings → Pages**.
2. Under **Build and deployment**, pick **Deploy from a branch**, choose the branch and the `/ (root)` folder, then save.
3. After a minute the site is live at `https://<username>.github.io/Nihal-Kazi/`.
