This is a minimal reproduction of an issue we're seeing where signatures from the Coinbase Smart Wallet don't seem to verify consistently. Specifically the behavior we see is that:
- When verifying signatures from the frontend, using viem's `verifyMessage` action, the signature verifies correctly
- When verifying the same exact signature from the backend (e.g. a NextJS API handler), using viem's `verifyMessage` action, verification fails

## Repro details

In this example app, I have stored an example `address`, (SIWE) `message`, and `signature` from the Coinbase Smart Wallet in `@/lib/siwe.ts`. 

To verify the signature client-side, I import these fields into `@/app/page.tsx` and verify them in the `onVerifyMessage` function here. This verification suceeds.

To verify the siganture API-side, I import these fields into `@/app/api/route.ts` and verify them within the API handler. I then make a request to this API via `onVerifyApi` in `@/app/page.tsx` to trigger verification, but verification fails within the API handler. 

## Steps to reproduce
1. Clone this repository and install dependencies
```sh
npm i
```
2. Run the app and open `http://localhost:3000` in your browser
```sh
npm run dev
```
3. Click the **Verify signature client-side** button in the app. This will attempt to use viem's `verifyMessage` on the frontend to verify the signature and it should succeed (as expected)
4. Click the **Verify signature API-side** button in the app. This will attempt to use viem's `verifyMessage` in a NextJS API handler to verify the same exact signature. This seems to consistently fail, which is unexpected, as it's the same `signature` / `message` / `address` combination as the client-side verification. 
