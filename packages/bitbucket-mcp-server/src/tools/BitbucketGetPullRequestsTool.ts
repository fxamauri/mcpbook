import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { bitbucketService } from "../services/services.js";
import { getBitbucketPullRequestData } from "../bitbucket-data.js";

interface BitbucketGetPullRequestsInput {
  repoSlug: string;
  workspace: string;
}

class BitbucketGetPullRequestsTool extends MCPTool<BitbucketGetPullRequestsInput> {
  name = "bitbucket-get-pull-requests";
  description = "Get Bitbucket pulls requests list all";

  schema = {
    repoSlug: {
      type: z.string(),
      description: "bitbucket git repository slug",
    },
    workspace: {
      type: z.string(),
      description: "bitbucket git repository workspace",
    },
  };

  async execute(input: BitbucketGetPullRequestsInput) {
    const data = await bitbucketService.getPullRequests({
      repoSlug: input.repoSlug,
      workspace: input.workspace,
    });
    const messages = data.values.map(getBitbucketPullRequestData);
    return messages;
  }
}

export default BitbucketGetPullRequestsTool;
