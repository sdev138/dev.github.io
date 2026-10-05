import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import posts, { type Post } from "virtual:posts";
import {
  introdata,
  links,
  workExperience,
  researcherExperience,
  volunteeringExperience,
  worktimeline,
  dataabout,
  dataportfolio,
} from "./content";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function Home() {
  return (
    <div className="home-content">
      <div className="biography">
        <p>{introdata.description}</p>
        <p>{introdata.description2}</p>
        <p>{introdata.description3}</p>
      </div>
      <ul className="contact-links" aria-label="Find me elsewhere">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
      {/* <div className="directory" aria-label="Explore the website">
        <a href="/work"><span>Work</span><span className="directory-description">Experience & research</span><span aria-hidden="true">↗</span></a>
        <a href="/products"><span>Products</span><span className="directory-description">Products & open source</span><span aria-hidden="true">↗</span></a>
        <a href="/blog"><span>Blog</span><span className="directory-description">Notes & writing</span><span aria-hidden="true">↗</span></a>
      </div> */}
    </div>
  );
}

function Timeline({
  title,
  entries,
}: {
  title: string;
  entries: { title: string; period: string; description: string }[];
}) {
  return (
    <section className="work-section">
      <h2 className="section-label">{title}</h2>
      <ol className="timeline">
        {entries.map((entry) => (
          <li className="timeline-entry" key={`${entry.title}-${entry.period}`}>
            <p className="timeline-period">{entry.period}</p>
            <div className="timeline-content">
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Work() {
  return (
    <div className="work-content">
      <Timeline title="Experience" entries={workExperience} />
      <Timeline title="Research" entries={researcherExperience} />
      <Timeline
        title="Education"
        entries={worktimeline.map((entry) => ({
          title: entry.jobtitle,
          period: entry.date,
          description: entry.where,
        }))}
      />
      <Timeline title="Volunteering" entries={volunteeringExperience} />
      <section className="work-section research-interests">
        <h2 className="section-label">{dataabout.title}</h2>
        <p>{dataabout.aboutme}</p>
      </section>
    </div>
  );
}

export function Products() {
  return (
    <ul className="product-list">
      {dataportfolio.map((project) => (
        <li key={project.url}>
          <a className="product" href={project.url}>
            <div className="product-title">
              <h2>{project.title}</h2>
              <span aria-hidden="true">↗</span>
            </div>
            <p>{project.description}</p>
            <ul className="technologies" aria-label="Technologies">
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Blog() {
  return posts.length ? (
    <ol className="post-list">
      {posts.map((post) => (
        <li key={post.slug}>
          <a className="post-link" href={`/blog/${post.slug}`}>
            <div>
              <h2>{post.title}</h2>
              {post.description && <p>{post.description}</p>}
            </div>
            <time dateTime={post.date}>
              {dateFormatter.format(new Date(post.date))}
            </time>
          </a>
        </li>
      ))}
    </ol>
  ) : (
    <div className="empty-blog">
      <p>No posts yet.</p>
      <p>New writing will appear here.</p>
    </div>
  );
}

export function BlogPost({ post }: { post: Post }) {
  return (
    <article className="post">
      <time className="post-date" dateTime={post.date}>
        {dateFormatter.format(new Date(post.date))}
      </time>
      <div className="markdown">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            table: ({ children }) => (
              <div
                className="table-scroll"
                tabIndex={0}
                role="region"
                aria-label="Scrollable table"
              >
                <table>{children}</table>
              </div>
            ),
            img: ({ src, alt, title }) => (
              <img src={src} alt={alt ?? ""} title={title} loading="lazy" />
            ),
          }}
        >
          {post.body}
        </Markdown>
      </div>
    </article>
  );
}

export function NotFound() {
  return (
    <p className="not-found">
      Try the navigation above, or <a href="/">return home</a>.
    </p>
  );
}
