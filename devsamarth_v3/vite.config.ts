import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const postsDirectory = fileURLToPath(new URL("./src/posts", import.meta.url));
const virtualId = "\0virtual:posts";

function readPosts() {
  const slugs = new Set<string>();
  return readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .flatMap((file) => {
      const source = readFileSync(join(postsDirectory, file), "utf8");
      const frontMatter = source.match(
        /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/,
      );
      if (!frontMatter)
        throw new Error(
          `${file}: add YAML front matter with a title and date.`,
        );
      let metadata: Record<string, unknown>;
      try {
        const parsed = Bun.YAML.parse(frontMatter[1]);
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
          throw new Error("Expected a YAML object.");
        metadata = parsed as Record<string, unknown>;
      } catch (error) {
        throw new Error(`${file}: invalid front matter. ${String(error)}`);
      }
      if (metadata.draft !== undefined && typeof metadata.draft !== "boolean") {
        throw new Error(`${file}: draft must be true or false.`);
      }
      if (metadata.draft === true) return [];

      const slug = file.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
      const date = metadata.date ?? file.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1];
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slugs.has(slug)) {
        throw new Error(
          `${file}: use a unique, lowercase, hyphen-separated filename.`,
        );
      }
      if (typeof metadata.title !== "string" || !metadata.title.trim()) {
        throw new Error(`${file}: title must be a non-empty string.`);
      }
      if (
        typeof date !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        Number.isNaN(Date.parse(date)) ||
        new Date(date).toISOString().slice(0, 10) !== date
      ) {
        throw new Error(
          `${file}: use a valid YYYY-MM-DD date in front matter or the filename.`,
        );
      }
      if (
        metadata.description !== undefined &&
        typeof metadata.description !== "string"
      ) {
        throw new Error(`${file}: description must be a string.`);
      }
      slugs.add(slug);
      return [
        {
          slug,
          title: metadata.title.trim(),
          date,
          description: metadata.description ?? "",
          body: source.slice(frontMatter[0].length),
        },
      ];
    })
    .sort(
      (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
    );
}

function markdownPages(): Plugin {
  let outputDirectory: string;
  const escapeHtml = (text: string) =>
    text.replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char]!,
    );

  return {
    name: "markdown-pages",
    configResolved(config) {
      outputDirectory = resolve(config.root, config.build.outDir);
    },
    resolveId(id) {
      if (id === "virtual:posts") return virtualId;
    },
    load(id) {
      if (id === virtualId)
        return `export default ${JSON.stringify(readPosts())};`;
    },
    configureServer(server) {
      server.watcher.add(postsDirectory);
      server.watcher.on("all", (_event, file) => {
        if (dirname(file) !== postsDirectory || !file.endsWith(".md")) return;
        const module = server.moduleGraph.getModuleById(virtualId);
        if (module) server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: "full-reload" });
      });
    },
    writeBundle() {
      const template = readFileSync(
        join(outputDirectory, "index.html"),
        "utf8",
      );
      const pages = [
        {
          route: "work",
          title: "Work",
          description:
            "A timeline of my work in product, engineering, and research.",
        },
        {
          route: "products",
          title: "Products",
          description: "Projects, tools, and things I've built along the way.",
        },
        {
          route: "blog",
          title: "Blog",
          description:
            "Notes on what I'm working on, learning, and thinking about.",
        },
        ...readPosts().map((post) => ({
          route: `blog/${post.slug}`,
          title: post.title,
          description: post.description,
        })),
      ];
      for (const page of pages) {
        const directory = join(outputDirectory, page.route);
        mkdirSync(directory, { recursive: true });
        const html = template
          .replace(
            /<title>.*?<\/title>/,
            () => `<title>${escapeHtml(page.title)} — Samarth Dev</title>`,
          )
          .replace(
            /<meta name="description" content="[^"]*"\s*\/?\s*>/,
            () =>
              `<meta name="description" content="${escapeHtml(page.description)}" />`,
          )
          .replace(
            /<link rel="canonical" href="[^"]*"\s*\/?\s*>/,
            () =>
              `<link rel="canonical" href="https://devsamarth.com/${page.route}" />`,
          );
        writeFileSync(join(directory, "index.html"), html);
      }
      writeFileSync(join(outputDirectory, "404.html"), template);
      writeFileSync(join(outputDirectory, ".nojekyll"), "");
    },
  };
}

export default defineConfig({
  plugins: [react(), markdownPages()],
  base: "/",
});
