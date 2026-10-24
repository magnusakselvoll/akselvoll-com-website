# AGENTS.md

Instructions for coding agents working on this repository.

This is the only agent-instructions file. **Don't add a `CLAUDE.md` or `CLAUDE.local.md`**,
here or in any parent directory. Claude Code reads `AGENTS.md` natively, but only when no
`CLAUDE.md`/`CLAUDE.local.md` exists in the working directory or above it. Adding one would
silently stop this file from loading. See <https://code.claude.com/docs/en/memory>.

## Project Context

A static website for akselvoll.com, served from `dist/` by Cloudflare Pages with no build step.
See [README.md](README.md) for the layout. Cloudflare settings (the Pages project, custom domains,
DNS) live in `magnusakselvoll/personal-cloud`, not here and not in the dashboard.

- Keep it dependency-free: no build tools or package managers unless asked.
- New external origins (fonts, scripts, embeds) must be added to the `Content-Security-Policy`
  in `dist/_headers`, or the browser blocks them.
- Compress new images before committing (at most about 1920 px wide, JPEG quality around 78,
  metadata stripped).

## Issue Tracking

Issues are tracked in GitHub. Use `gh issue list` to see open issues and `gh issue view <number>` for details.

## Git Workflow (GitHub Flow)

Always use GitHub Flow when working on issues:

1. **Create a feature branch** before making any file edits — no exceptions:
   - First fetch and checkout latest main: `git fetch origin && git checkout main && git pull`
   - Branch name format: `<issue-number>-<short-description>` (e.g., `1-tidy-repo`)
   - Create and checkout the branch, then push it right away
   - **Only use worktrees** when explicitly asked

2. **Commit** changes with descriptive messages:
   - Use conventional commit prefixes: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, `ci:`
   - Write commit messages as plain double-quoted strings — no heredocs, no `$()` substitution
   - Each `-m` value must be a single line; use separate `-m` flags for multi-line messages

3. **Push** the branch and **create a PR**:
   - **Ask before creating the PR** — the user may have feedback based on the content
   - Reference the issue in the PR body with `Closes #<issue-number>`
   - Pass `--title` and `--body` as plain strings to `gh pr create` — no heredocs, command
     substitution or backticks
   - Always pass `--head <branch-name> --base main`
   - Pushing a branch creates a Pages preview deployment; check it before merging, since merging
     to `main` deploys to production

4. **Merge** after review (squash merge preferred)

5. **Clean up** after the user confirms a PR is merged:
   - `git fetch origin && git checkout main && git pull`
   - `git branch -d <branch-name>`
