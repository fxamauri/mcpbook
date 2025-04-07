import axios, { AxiosInstance } from "axios";

interface BitbucketUser {
  display_name: string;
  links: {
    self: { href: string };
    avatar: { href: string };
    repositories: { href: string };
    snippets: { href: string };
    html: { href: string };
    hooks: { href: string };
  };
  created_on: Date;
  type: string;
  uuid: string;
  has_2fa_enabled: boolean | null;
  username: string;
  is_staff: boolean;
  account_id: string;
  nickname: string;
  account_status: string;
  location: string | null;
}

interface PullRequestsParams {
  workspace: string;
  repoSlug: string;
}

interface PullRequestsQueryParams {
  page?: number;
  pagelen?: number;
}

interface PullRequestParams {
  workspace: string;
  repoSlug: string;
  prId: string;
}

interface BitbucketPageResponse {
  pagelen: number;
  size: number;
  page: number;
  previous: string | null;
  next: string | null;
}

export interface BitbucketPullRequest {
  comment_count: number;
  task_count: number;
  type: string;
  id: number;
  title: string;
  description: string;
  state: string;
  merge_commit: string | null;
  close_source_branch: boolean;
  closed_by: string | null;
  author: {
    display_name: string;
    links: {
      self: { href: string };
      avatar: { href: string };
      html: { href: string };
    };
    type: string;
    uuid: string;
    account_id: string;
    nickname: string;
  };
  reason: string;
  created_on: Date;
  updated_on: Date;
  destination: {
    branch: {
      name: string;
    };
    commit: {
      hash: string;
      links: {
        self: { href: string };
        html: { href: string };
      };
      type: string;
    };
    repository: {
      type: string;
      full_name: string;
      links: {
        self: { href: string };
        html: { href: string };
        avatar: { href: string };
      };
      name: string;
      uuid: string;
    };
  };
  source: {
    branch: {
      name: string;
    };
    commit: {
      hash: string;
      links: {
        self: { href: string };
        html: { href: string };
      };
      type: string;
    };
    repository: {
      type: string;
      full_name: string;
      links: {
        self: { href: string };
        html: { href: string };
        avatar: { href: string };
      };
      name: string;
      uuid: string;
    };
  };
  links: {
    self: { href: string };
    html: { href: string };
    commits: { href: string };
    approve: { href: string };
    "request-changes": { href: string };
    diff: { href: string };
    diffstat: { href: string };
    comments: { href: string };
    activity: { href: string };
    merge: { href: string };
    decline: { href: string };
    statuses: { href: string };
  };
  summary: {
    type: string;
    raw: string;
    markup: string;
    html: string;
  };
  draft: boolean;
}

interface BitbucketPullRequests extends BitbucketPageResponse {
  values: BitbucketPullRequest[];
}

export class BitbucketClient {
  private client: AxiosInstance;
  private baseURL: string = "https://api.bitbucket.org/2.0";

  constructor(username: string, password: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      auth: {
        username,
        password,
      },
    });
  }

  async getUser(): Promise<BitbucketUser> {
    const { data } = await this.client.get("/user");
    return data;
  }

  async getPullRequests(
    params: PullRequestsParams,
    queryParams?: PullRequestsQueryParams,
  ): Promise<BitbucketPullRequests> {
    const { data } = await this.client.get(
      `/repositories/${params.workspace}/${params.repoSlug}/pullrequests`,
      {
        params: {
          ...queryParams,
        },
      },
    );
    return data;
  }

  async getPullRequest(
    params: PullRequestParams,
  ): Promise<BitbucketPullRequest> {
    const { data } = await this.client.get(
      `/repositories/${params.workspace}/${params.repoSlug}/pullrequests/${params.prId}`,
    );
    return data;
  }
}
