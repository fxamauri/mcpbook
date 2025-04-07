import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { bitbucketService } from "../services/services.js";
import { getBitbucketPullRequestData } from "../bitbucket-data.js";

interface BitbucketGetPullRequestInput {
  prId: string;
  repoSlug: string;
  workspace: string;
}

class BitbucketGetPullRequestTool extends MCPTool<BitbucketGetPullRequestInput> {
  name = "bitbucket-get-pull-request";
  description = "Get Bitbucket pull request details";

  schema = {
    prId: {
      type: z.string(),
      description: "bitbucket pull request id",
    },
    repoSlug: {
      type: z.string(),
      description: "bitbucket git repository slug",
    },
    workspace: {
      type: z.string(),
      description: "bitbucket git repository workspace",
    },
  };

  async execute(input: BitbucketGetPullRequestInput) {
    const data = await bitbucketService.getPullRequest({
      prId: input.prId,
      repoSlug: input.repoSlug,
      workspace: input.workspace,
    });

    const message = getBitbucketPullRequestData(data);
    return message;
  }
}

export default BitbucketGetPullRequestTool;
