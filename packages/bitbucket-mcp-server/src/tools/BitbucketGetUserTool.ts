import { MCPTool } from "mcp-framework";
import { bitbucketService } from "../services/services.js";

class BitbucketGetUserTool extends MCPTool {
  name = "bitbucket-get-user";
  description = "BitbucketGetUser data";

  schema = {};

  async execute() {
    const data = await bitbucketService.getUser();
    return {
      display_name: data.display_name,
      username: data.username,
      nickname: data.nickname,
    };
  }
}

export default BitbucketGetUserTool;
