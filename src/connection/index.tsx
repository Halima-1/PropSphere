import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { liskSepolia } from "@reown/appkit/networks";
import { type AppKitNetwork } from "@reown/appkit/networks";
import type { ReactNode } from "react";

// 1. Get projectId
const projectId = import.meta.env.VITE_PROJECT_ID;


// 2. Set the networks
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [liskSepolia];

// 3. Create a metadata object - optional
const metadata = {
    name: "LymarhProp",
    description: "This is a real estate marketplace built with AppKit",
    url: "http://localhost:5173/", // origin must match your domain & subdomain
    icons: ["https://avatars.mywebsite./"],
};

// 4. Create a AppKit instance
createAppKit({
    adapters: [new EthersAdapter()],
    networks,
    metadata,
    projectId,
    features: {
        analytics: true, // Optional - defaults to your Cloud configuration
    },
});

export default function AppkitWrapper({ children }: { children: ReactNode }) {
    return <div>{children} </div>
}

