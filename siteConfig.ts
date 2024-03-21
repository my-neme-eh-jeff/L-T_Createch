import { env } from "./src/env";

await import("./src/env");

export const siteConfig = {
  name: "andushandhu",
  description: "andushandhuandushandhuandushandhu",
  url: env.NEXTAUTH_URL,
  creator: "Aman nambisan",
  authors: [
    {
      name: "Aman Nambisan",
      url: "https://www.linkedin.com/in/amannambisan/",
    },
  ],
};
