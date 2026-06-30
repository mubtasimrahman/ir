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

====================================================
## June 23 Rollback / Revert Notes
## Context
A new Air Purifier project page was added under /air-purifier. The work was started on/around June 23 while a new collaborator was still learning the repo structure and in the process, some air purifier-related work was mistakenly merged into branches.
The later goal became:
1. Return the main branch to the state it had before the Air Purifier work.
2. Clean backend-cms-integration from the project-add-new-pages merge.
3. Keep project-add-new-pages as the future working/deployment branch.
All rollback work was done using normal git revert commits rather than git reset hard or history rewriting.

## Why the Git history looks messy
The history looks messy because several corrective commits were made while trying to undo the Air Purifier-related changes safely.
Air Purifier work was first added on project-add-new-pages.
That work was merged into main through PR #4 and PR #5.
main was later merged back into project-add-new-pages.
project-add-new-pages was also merged into backend-cms-integration through PR #7.
PR #4 on main was reverted once, then reapplied during troubleshooting, then reverted again.
PR #5 on main was reverted.
Follow-up Air Purifier commits were reverted on project-add-new-pages.
PR #7 was reverted on backend-cms-integration.
No force push was used. The messy history is mostly the result of safe revert commits being used instead of deleting or rewriting shared history.

## What was reverted on main
The Air Purifier work entered main mainly through:
Merge pull request #4 from mubtasimrahman/project-add-new-pages
Merge pull request #5 from mubtasimrahman/project-add-new-pages

The following rollback actions were ultimately made on main:
Revert "Merge pull request #5 from mubtasimrahman/project-add-new-pages"
Revert "Merge pull request #4 from mubtasimrahman/project-add-new-pages"

The final state of main is that the Air Purifier page is no longer present in source code. But in live website the air purifier page still appears due to the failed build/deploy after reverting PR #4.

## Why the main build/deploy failed after reverting PR #4
After main was reverted back toward its older state, GitHub Actions ran the older workflow: front-end.yaml. That old workflow uses: actions/upload-artifact@v3
GitHub now blocks/deprecates that artifact action version. Because of that, the workflow failed very early with an error about deprecated actions/upload-artifact: v3.
This failure was expected after restoring the older main state. It does not necessarily mean the source code itself failed to build. It means the old deployment workflow is no longer accepted by GitHub Actions. When the revert build/deploy on main failed, the reverted build was not successfully published to gh-pages. Therefore, Hostinger continued serving the last successfully deployed gh-pages version. Hence, that previous successful deployment still includes: /air-purifier. So the live website still shows the Air Purifier page even after main source code has been cleaned. 

## What was reverted on project-add-new-pages
project-add-new-pages contains the Air Purifier development history and is intended to be used for future work/deployment.The following follow-up Air Purifier commits were reverted on project-add-new-pages:
Revert "Optimize Air Purifier page performance"
Revert "Fix Air Purifier mobile Safari video behavior"
Important: the base Air Purifier page still exists on project-add-new-pages because Add Air Purifier project page was not reverted there. This was intentional because project-add-new-pages is expected to remain the branch for future Air Purifier/page work.
Reverting Add Air Purifier project page on project-add-new-pages would remove the base Air Purifier page, route, styles, and assets from that branch.

## What was reverted on backend-cms-integration
Air Purifier-related commits appeared in backend-cms-integration because project-add-new-pages was merged into it through PR #7. To clean backend-cms-integration, the following revert was made and pushed:
Revert "Merge pull request #7 from mubtasimrahman/project-add-new-pages"
This revert removed the Air Purifier/project-add-new-pages changes from backend-cms-integration.

## Current state summary

## Main : 
has been returned toward the old pre-Air-Purifier state. Air Purifier references were not found in client when checked on main. GitHub Actions from main fails because the old workflow uses deprecated actions/upload-artifact@v3.

## Project-add-new-pages: 
still exists as the future work branch. The optimization and mobile Safari video behavior commits were reverted there. The base Air Purifier page still exists there intentionally.

## Backend-cms-integration: 
has had PR #7 reverted and pushed. 

## Gh-pages: 
still contains the last successful deployed build. This is why the live website still shows/air-purifier until a successful deployment updates gh-pages and Hostinger serves the new build.

## Future plan
- Do not continue Air Purifier development from main.
- Keep main as the old/restored branch.
- Use project-add-new-pages for future Air Purifier/page work.
- Update the GitHub Actions workflow on project-add-new-pages so build/deploy runs from project-add-new-pages instead of main.
Do not manually edit gh-pages.
If Air Purifier development should continue, keep the page work on project-add-new-pages, update the workflow there, and deploy from that branch after review.

