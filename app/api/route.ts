import { address, message, signature } from "@/lib/siwe";
import { createPublicClient, http } from "viem";
import { zora } from "viem/chains";

export async function GET() {
    const client = createPublicClient({chain: zora, transport: http()});
    const isValid = await client.verifyMessage({message, signature, address})
 
    return Response.json({
        isValid: isValid
    });
}