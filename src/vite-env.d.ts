// / <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PROJECT_ID: string;
    readonly VITE_CONTRACT_ADDRESS: string;
    VITE_PINATA_JWT: string;
    VITE_PINATA_GATEWAY: string
    // add any other VITE_ variables you have here
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}