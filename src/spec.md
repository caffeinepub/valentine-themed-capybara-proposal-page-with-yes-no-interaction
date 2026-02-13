# Specification

## Summary
**Goal:** Provide clear mainnet deployment instructions and ensure the app builds and runs cleanly when hosted on the Internet Computer.

**Planned changes:**
- Add a deployment guide (e.g., DEPLOYMENT.md or README section) with prerequisites, build steps, mainnet deploy commands (`dfx deploy --network ic`), and how to find the resulting live canister URL(s).
- Ensure the frontend has a production build path suitable for an IC assets canister, including SPA routing behavior so deep links/refresh do not 404.
- Verify the backend Motoko canister compiles and is deployable to mainnet without configuration/build errors.

**User-visible outcome:** A developer can follow documented steps to deploy the project to IC mainnet and access the live app via the resulting canister URL(s), with the SPA loading correctly when refreshed or accessed directly.
