# Collaborator Handover

## Project overview

This repository contains a React + TypeScript + Vite website with a content update flow backed by GitHub Actions and Google Cloud Run.

![Project overview diagram](https://i.postimg.cc/fVS2yNNZ/Irreal-Visuals-CMS.png)

- `client/`: front-end app
- `server/`: backend content files and placeholder server code
- `.github/workflows/`: GitHub Actions pipelines
- `server/content/`: JSON content files consumed by the client

The website is hosted on Hostinger and the source is on GitHub.

## Current deployment and content update flow

### GitHub repo

- Repository: `mubtasimrahman/ir`
- Main branch is `main`
- Content branch used by current flow: `backend-cms-integration`

### GitHub Actions workflows

1. `.github/workflows/update-content.yaml`
   - Trigger: `workflow_dispatch`
   - Inputs: `content`, `filePath`
   - Action: checks out repo, writes JSON to the specified file, commits, and pushes changes

2. `.github/workflows/build-and-deploy.yaml`
   - Trigger:
     - `push` on `main`
     - `pull_request` targeting `main`
     - `workflow_run` after `update-content` completes
   - Action: installs client dependencies, builds `client`, uploads artifact, downloads artifact, and deploys to GitHub Pages via `peaceiris/actions-gh-pages`

### Hostinger integration

- Hostinger is configured to deploy the site from the repository using a GitHub webhook
- Repo remote configured: `https://github.com/mubtasimrahman/ir.git`
- Hostinger webhook URL: `https://webhooks.hostinger.com/deploy/957d6d29ee7e50a4979f226d5c4aa610`

### Content update orchestrator

- A Google Cloud Run function is currently used as the middle layer
- It sends a GitHub workflow dispatch request to:
  `https://api.github.com/repos/mubtasimrahman/ir/actions/workflows/update-content.yaml/dispatches`
- It currently uses:
  - `ref: 'backend-cms-integration'`
  - `inputs.content`: JSON string of the updated data
  - `inputs.filePath`: path to the target JSON file
- The function uses a GitHub PAT (`githubToken`) for authentication today

#### Two Cloud Run endpoints

- `updateAllTrades` / `/triggerAllTrades`
  - Only updates a JSON file
  - It sends JSON content directly to the workflow dispatch endpoint
  - It does not upload any image files

- `updateFeaturedProjects` / `/triggerFeaturedProjects`
  - Uploads image files directly to GitHub using the GitHub Contents API
  - Then dispatches the `update-content` workflow to update the JSON content file
  - So image upload is handled by this Cloud Run function, while the workflow only updates the JSON file

## Important branch/branch ref behavior

- The admin content update flow currently writes data to `backend-cms-integration`
- `build-and-deploy.yaml` does not run on pushes to `backend-cms-integration`
- `build-and-deploy.yaml` runs on:
  - pushes to `main`
  - pull requests targeting `main`
  - successful `workflow_run` events from `update-content`
- That means direct CLI/IDE push to `backend-cms-integration` alone does not trigger the build/deploy pipeline unless it is part of a PR to `main` or the update-content workflow invokes it

## Client content fetch details

- `client/src/Components/Utils/FetchJSON.ts` currently fetches content from GitHub API with:
  ```ts
  const currentRepo = "backend-cms-integration";
  ```
- It reads files via:
  `https://api.github.com/repos/mubtasimrahman/ir/contents/${filePath}?ref=${currentRepo}`
- This branch/value must be updated when the repo or branch changes
- The client expects `response.data.content` to be Base64 and then JSON-parses it

## Admin page and security

- Admin page route: `/tuntuni`
- It currently does not require authentication
- A recommended improvement is to add authentication before giving write access to the content flow
- Suggested approach:
  - Google OAuth 2.0 using Google Identity Platform
  - Google Cloud Run identity check
  - Firebase Authentication with hosted UI or token verification
- This is important because the admin path can trigger GitHub workflows and update repo content

## Package update notes

The project currently has several packages out of date. `ncu` reported these available updates:

- `@types/react`: ^19.1.8 → ^19.2.14
- `@types/react-dom`: ^19.1.6 → ^19.2.3
- `@typescript-eslint/eslint-plugin`: ^8.35.0 → ^8.59.2
- `@typescript-eslint/parser`: ^8.35.0 → ^8.59.2
- `@vitejs/plugin-react`: ^4.6.0 → ^6.0.1
- `axios`: ^1.10.0 → ^1.16.0
- `bootstrap`: ^5.3.7 → ^5.3.8
- `eslint`: ^8.57.0 → ^10.3.0
- `eslint-import-resolver-typescript`: ^3.7.0 → ^4.4.4
- `eslint-plugin-react-hooks`: ^5.2.0 → ^7.1.1
- `eslint-plugin-react-refresh`: ^0.4.18 → ^0.5.2
- `react`: ^19.1.0 → ^19.2.6
- `react-dom`: ^19.1.0 → ^19.2.6
- `react-icons`: ^5.5.0 → ^5.6.0
- `react-router`: ^7.6.3 → ^7.15.0
- `sass`: ^1.77.6 → ^1.99.0
- `stylelint-config-standard-scss`: ^15.0.1 → ^17.0.0
- `typescript`: ^5.8.3 → ^6.0.3
- `vite`: ^7.0.0 → ^8.0.11

### Package update caution

- `sass` upgrade may break `stylelint` and has known compatibility issues
- `eslint` 10.x may require configuration changes, especially if flat config was already problematic
- Major updates like `vite`, `@vitejs/plugin-react`, and `typescript` should be handled carefully
- Do not update everything blindly; test each major upgrade in isolation

## Recommended handover documentation topics

1. Project architecture and folder layout
2. Content update flow and GitHub workflow details
3. GitHub Actions triggers and branch behavior
4. Hostinger deployment webhook configuration
5. Google Cloud Run trigger endpoint and secret management plan
6. Admin path security and authentication plan
7. Current package status and update risks
8. Instructions for replacing `currentRepo` / repo references
9. Local development and build commands
10. How to verify changes and deploy content safely

## Getting started for a collaborator

### Local setup

1. Clone the repo
2. `cd client`
3. `npm install`
4. `npm run dev`

If the collaborator needs to work on any backend or Cloud Run logic, also inspect the `server/` folder and Cloud Run deployment setup.

### Useful commands

- `cd client && npm install`
- `cd client && npm run dev`
- `cd client && npm run build`
- `cd client && npm run lint`
- `cd client && npx npm-check-updates`
- `cd client && npx npm-check-updates --dry-run`
- `cd client && npx npm-check-updates -u` (only if ready to upgrade)

## Things to fix first

- Move GitHub PAT out of code and into Google Secret Manager
- Secure the `/tuntuni` admin route with authentication
- Centralize repo/branch config instead of hard-coded `currentRepo`
- Confirm whether `build-and-deploy.yaml` should also run on `backend-cms-integration` or if the content branch should merge into `main`
- Document the exact Hostinger webhook and deploy branch requirements

## Notes for the collaborator

- The admin page currently exists in `client/src/App/App.tsx` at route `/tuntuni`
- The content fetch helper is `client/src/Components/Utils/FetchJSON.ts`
- The current flow is GitHub-centric: Cloud Run triggers GitHub workflow, GitHub Actions updates repo, then deploys
- The repo currently uses GitHub Pages deployment via `peaceiris/actions-gh-pages`

---

This document should help a new collaborator understand the existing content update pipeline, the current security gaps, and the key technical areas to review before making changes.
