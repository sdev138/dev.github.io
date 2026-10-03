/// <reference types="vite/client" />

declare module "*.pdf" {
  const content: string;
  export default content;
}

declare module "virtual:posts" {
  export interface Post {
    slug: string;
    title: string;
    date: string;
    description: string;
    body: string;
  }
  const posts: Post[];
  export default posts;
}
