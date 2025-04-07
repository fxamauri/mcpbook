import { BitbucketClient } from "./bitbucket.js";
import { ENV_BITBUCKET } from "../constants.js";

let bitbucketClientInstance: BitbucketClient | null = null;

export function getBitbucketClient(): BitbucketClient {
  if (!bitbucketClientInstance) {
    const client = new BitbucketClient(
      ENV_BITBUCKET.BITBUCKET_USERNAME || "",
      ENV_BITBUCKET.BITBUCKET_APP_PASSWORD || "",
    );
    bitbucketClientInstance = client;
  }
  return bitbucketClientInstance;
}

export const bitbucketService = getBitbucketClient();
