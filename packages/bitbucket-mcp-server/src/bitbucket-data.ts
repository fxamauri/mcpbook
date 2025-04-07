import { BitbucketPullRequest } from "./services/bitbucket.js";

export const getBitbucketPullRequestData = (data: BitbucketPullRequest) => {
  return {
    title: data.title,
    description: data.description,
    state: data.state,
    created_on: data.created_on,
    updated_on: data.updated_on,
    author: data.author.display_name,
    reason: data.reason,
    source: data.source.branch.name,
    destination: data.destination.branch.name,
    draft: data.draft,
    linkHref: data.links.self.href,
  };
};
