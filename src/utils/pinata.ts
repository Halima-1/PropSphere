import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_JWT,
  pinataGateway: import.meta.env.VITE_PINATA_GATEWAY,
});

export async function uploadToPinata(file: File | File[]) {
  try {
    const upload = Array.isArray(file)
      ? await (pinata.upload as any).public.fileArray(file)
      : await (pinata.upload as any).public.file(file);
    return upload.cid;
  } catch (error) {
    console.error("Pinata upload error:", error);
    throw error;
  }
}

export const retrieveFromPinata = async (cid: string) => {
  try {
    const url = await pinata.gateways.public.convert(cid);
    return url;
  } catch (error) {
    console.log(error);
  }
};
