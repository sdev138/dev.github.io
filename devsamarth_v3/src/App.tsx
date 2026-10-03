import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import posts from "virtual:posts";
import { introdata, meta } from "./content";
import { Home, Work, Products, Blog, BlogPost, NotFound } from "./pages";
import "./App.css";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
];

const currentPath = () => window.location.pathname.replace(/\/+$/, "") || "/";

function App() {
  const [path, setPath] = useState(currentPath);
  const cube = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);
  const previousPath = useRef(path);
  const post = posts.find((entry) => path === `/blog/${entry.slug}`);
  const page = {
    "/": { title: introdata.title, description: introdata.title2 },
    "/work": {
      title: "Work",
      description: "Timeline of my work in product, engineering, and research.",
    },
    "/products": {
      title: "Products",
      description: "Products, projects, tools, and things I've built along the way.",
    },
    "/blog": {
      title: "Blog",
      description: "What I'm working, learning, and thinking about.",
    },
  }[path] ?? {
    title: post?.title ?? "Page not found",
    description: post?.description ?? "This page doesn't seem to be here.",
  };

  const jump = useCallback(async () => {
    animation.current?.cancel();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;

    const next = cube.current?.animate(
      [
        { transform: "translateY(0)", easing: "cubic-bezier(.2,.7,.3,1)" },
        { transform: "translateY(-28px)", offset: 0.42, easing: "cubic-bezier(.6,0,.9,.5)" },
        { transform: "translateY(0)" },
      ],
      { duration: 320 },
    );
    if (!next) return true;
    animation.current = next;
    try {
      await next.finished;
      return true;
    } catch {
      // A newer navigation replaced this jump.
      return false;
    } finally {
      if (animation.current === next) animation.current = null;
    }
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const destination = currentPath();
      void jump().then((landed) => {
        if (landed) setPath(destination);
      });
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
      animation.current?.cancel();
    };
  }, [jump]);

  useEffect(() => {
    document.title = path === "/" ? meta.title : `${page.title} — ${meta.title}`;
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content", path === "/" ? meta.description : page.description,
    );
    document.querySelector('link[rel="canonical"]')?.setAttribute(
      "href", `https://devsamarth.com${path === "/" ? "/" : path}`,
    );
    if (previousPath.current !== path) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.getElementById("page-title")?.focus({ preventScroll: true });
      previousPath.current = path;
    }
  }, [path, page.title, page.description]);

  function onLinkClick(event: MouseEvent<HTMLDivElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
      event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest("a") : null;
    if (!link || !link.hasAttribute("href") || link.hasAttribute("download") ||
      (link.target && link.target !== "_self")) return;
    const destination = new URL(link.href, window.location.href);
    // In-page anchors (including the keyboard skip link) retain native scrolling.
    if (destination.origin === window.location.origin &&
      destination.pathname === window.location.pathname && destination.hash) return;

    event.preventDefault();
    void jump().then((landed) => {
      if (!landed) return;
      const localPage = destination.origin === window.location.origin &&
        !/\.[^/]+$/.test(destination.pathname);
      if (localPage) {
        if (destination.href !== window.location.href) {
          window.history.pushState(null, "", destination.href);
        }
        setPath(currentPath());
      } else {
        window.location.assign(destination.href);
      }
    });
  }

  return (
    <div className="site-shell" onClick={onLinkClick}>
      <a className="skip-link" href="#content">Skip to content</a>
      <header className="site-header">
        <nav className="navigation" aria-label="Main navigation">
          {navigation.map(({ href, label }) => {
            const active = href === "/" ? path === href : path === href || path.startsWith(`${href}/`);
            return (
              <a key={href} href={href} className="navigation-link" aria-current={active ? "page" : undefined}>
                <span className="menu-marker" aria-hidden="true" />
                {label}
              </a>
            );
          })}
        </nav>
        <div className="interface-rule" aria-hidden="true" />
      </header>

      <main id="content" tabIndex={-1}>
        <div className="page-header">
          <div className="cube-scene" aria-hidden="true">
            <div className="cube-jump" ref={cube}>
              <div className="cube">
                {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => (
                  <span className={`cube-face cube-face--${face}`} key={face} />
                ))}
              </div>
            </div>
            <span className="cube-ground" />
          </div>
          <h1 id="page-title" tabIndex={-1}>{page.title}</h1>
          {page.description && <p className="page-description">{page.description}</p>}
        </div>

        {path === "/" ? <Home /> :
          path === "/work" ? <Work /> :
            path === "/products" ? <Products /> :
              path === "/blog" ? <Blog /> :
                post ? <BlogPost post={post} /> : <NotFound />}
      </main>

      <footer className="site-footer">
        {path === "/" ? <span>Samarth Dev</span> : (
          <a href={post ? "/blog" : "/"}>
            <span aria-hidden="true">← </span>{post ? "Back to blog" : "Back home"}
          </a>
        )}
        <a href="mailto:samarthdev138@gmail.com">Get in touch <span aria-hidden="true">↗</span></a>
      </footer>
    </div>
  );
}

export default App;
