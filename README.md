# akselvoll-com-website

The personal website at <https://akselvoll.com>: a static one-pager based on the
[Highlights](https://html5up.net/highlights) template by HTML5 UP (CC BY 3.0, see `dist/LICENSE.txt`).

## Layout

Everything served is in `dist/`, and there is no build step: edit the files there directly.

- `index.html`: the page
- `assets/css/main.css`: the styles. The template's Sass sources were removed, since this file is
  edited directly
- `assets/js/main.js`: scrolling, navigation dots, the avatar lightbox and the chat widget
- `images/`: photos. Keep them at most about 1920 px wide and compressed (JPEG quality around 78)
- `_headers`: response headers for Cloudflare Pages (security headers, caching). If the page starts
  loading anything from a new origin, add it to the `Content-Security-Policy` there
- `404.html`: served by Pages for any unknown path

To preview locally:

```bash
python3 -m http.server -d dist
```

`_headers` only applies on Pages, so check CSP problems in a preview deployment.

## Deployment

Cloudflare Pages deploys the site through its Git integration. Every push to `main` goes to
production, and every other branch gets a preview deployment, linked in a comment on its pull request.

The Pages project's settings, its custom domains (`akselvoll.com`, `www.akselvoll.com`) and the DNS
records are managed with Terraform in
[magnusakselvoll/personal-cloud](https://github.com/magnusakselvoll/personal-cloud) (`cloudflare.tf`).
Change them there, not in the Cloudflare dashboard. That includes the build settings: the output
directory `dist` is set there, so renaming the folder needs a change in both repositories.
