"use client";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { message, signature, address } from "@/lib/siwe";
import { useState } from "react";

export default function Home() {
  const [clientSideVerification, setClientSideVerification] = useState<
    boolean | undefined
  >();
  const [apiSideVerification, setApiSideVerification] = useState<
    boolean | undefined
  >();

  // Verifying the signature from client-side code
  const onVerifyMessage = async () => {
    const client = createPublicClient({ chain: mainnet, transport: http() });
    const isValid = await client.verifyMessage({ message, signature, address });
    setClientSideVerification(isValid);

    setTimeout(() => {
      setClientSideVerification(undefined);
    }, 2000);
  };

  // Calling a NextJS API handler to verify the signature. See `@/app/api/route.ts`
  // for the verification logic there
  const onVerifyApi = async () => {
    const res = await fetch("/api");
    const { isValid } = await res.json();
    setApiSideVerification(isValid);

    setTimeout(() => {
      setApiSideVerification(undefined);
    }, 2000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <button onClick={() => onVerifyMessage()}>
          Verify signature client-side
        </button>
        {clientSideVerification === true &&
          "Client-side signature verified correctly"}
        {clientSideVerification === false &&
          "Client-side signature did not verify correctly"}
        <br />
        <button onClick={() => onVerifyApi()}>
          Verify signature in API handler
        </button>
        {apiSideVerification === true &&
          "API-side signature verified correctly"}
        {apiSideVerification === false &&
          "API-side signature did not verify correctly"}
      </div>
    </main>
  );
}
