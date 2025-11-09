# Lecture Notes — Database Basics

This repository contains static HTML lecture notes and exercises for introductory database topics (ER modelling, normalization, SQL examples, etc.). It is structured as a simple static site and can be hosted on GitHub Pages.

What’s included
- `db-basics.html` — core interactive script
- `erm/challenges.html` — ER-modelling challenges
- `css/`, `js/`, `erm/`, `diagrams/` — assets and subpages

Publish on GitHub Pages (automated)

This repository contains a GitHub Actions workflow (`.github/workflows/deploy.yml`) that will automatically publish the site to the `gh-pages` branch whenever you push to `main`.

Steps to enable:

1. Push this repository to GitHub (e.g. `origin/main`).
2. The workflow will run on push and create/update the `gh-pages` branch.
3. In your repository settings → Pages, set the source to the `gh-pages` branch (root). GitHub will then serve the site at `https://<username>.github.io/<repo>/`.

Notes and caveats
- Links in the site use relative paths and should work when served from the repo root (project pages). Avoid root-absolute links (starting with `/`) if you plan to host as a project page under `https://<user>.github.io/<repo>/`.
- The workflow uses the default `GITHUB_TOKEN` and should work without extra secrets. If your organization prevents workflow pushes, you may need to use a personal access token saved as a repository secret.
