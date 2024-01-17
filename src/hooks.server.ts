import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"

const githubConfig = {
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
}

export const handle = SvelteKitAuth({
  providers: [GitHub(githubConfig)],
})