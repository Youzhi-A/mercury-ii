import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const githubOwner = process.env.GITHUB_REPOSITORY_OWNER;
const githubRepository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGitHubPages = Boolean(process.env.GITHUB_ACTIONS && githubOwner && githubRepository);
const isUserSite = githubRepository === `${githubOwner}.github.io`;

export default defineConfig({
  site: isGitHubPages ? `https://${githubOwner}.github.io` : 'https://mercury2.space',
  base: isGitHubPages && !isUserSite ? `/${githubRepository}` : undefined,
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: true,
    },
  },
});
