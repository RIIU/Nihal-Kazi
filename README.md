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
```

## Preview locally

Open `index.html` in a browser.

## Things to personalize

Some content is placeholder text you should replace:

- **Contact email:** set `CONTACT_EMAIL` at the top of `assets/js/main.js`. The contact form opens the visitor's email app addressed to it.
- **Projects:** edit `assets/js/projects.js`. Each line is one website (name, URL, description, filter categories, tag).
  Screenshots load automatically from the WordPress mShots service in the visitor's browser. The first visit to a new site can take a few seconds while the screenshot is generated, and a colored letter shows until then. To use your own image instead, put it in `assets/img/projects/` and add `image: "assets/img/projects/name.jpg"` to that project.
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
