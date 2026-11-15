# KCDhanunjay Infosys — Organized project

## Folder structure
- `frontend/`: HTML, CSS, browser JavaScript, and assets.
- `backend/server.js`: Express, MongoDB Atlas, authentication, exams, payments, and admin APIs.
- `docs/DEPLOYMENT.md`: Render and Atlas setup instructions.
- `package.json`, `render.yaml`, `.env.example`: root deployment configuration.

## Run
1. Copy `.env.example` to `.env` and configure MongoDB Atlas and a strong JWT secret.
2. Run `npm install`.
3. Run `npm start`.
4. Open `http://localhost:3000` (or the configured PORT).

## Render
Keep the Render service root directory as the repository root. Use `npm install --omit=dev`
and `npm start`. Static files are served from `frontend/` on the same origin as `/api/*`.

**Important:** Do not delete files in your existing `frontend/` or `backend/` folders that
are absent from this ZIP. Back up your repository and merge carefully.
Images/videos referenced by HTML were not included in the provided package.
Never commit `.env` or credentials. See `docs/DEPLOYMENT.md` for limitations.

## Windows duplicate cleanup
Extract this ZIP into the existing repository folder so you have `kcdhanunjayinfosys-clean/`.
Open PowerShell in the repository root and run:
`powershell -ExecutionPolicy Bypass -File .\kcdhanunjayinfosys-clean\CLEANUP-WINDOWS.ps1`
This keeps `.git`, moves all previous root files/folders into a timestamped backup, and moves the clean structure to the repository root. It does **not** permanently delete the backup.
The old unrelated Word document and unbundled JSX sample are not included in the clean project.
"# kcdhanunjayinfosys" 
