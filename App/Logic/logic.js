import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";
import { graphql } from "https://cdn.skypack.dev/@octokit/graphql";

const octokit = new Octokit();

export default function A(){
  octokit.rateLimit.get().then(dst => {
    console.log(dst);
  });
}
