import { ArrowRight, Clock3 } from 'lucide-react';
import { posts } from '../data/portfolio';
import SectionHeading from './SectionHeading';

export default function Blog() {
  return (
    <section className="content-section section-shell reveal-section" id="blog">
      <div className="blog-heading">
        <SectionHeading title="Notas y pensamientos" />
        <a href="#contact">
          Ver todo el blog
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>

      <div className="posts-grid">
        {posts.map((post) => (
          <article className={`post-card accent-${post.accent}`} key={post.title}>
            <div className="post-meta">
              <span>{post.category}</span>
              <small>
                <Clock3 size={14} aria-hidden="true" />
                {post.date}
              </small>
            </div>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <div className="post-author">
              <img src="/images/portfolio-01.jpg" alt="" loading="lazy" />
              <div>
                <strong>Leonardo Matías</strong>
                <span>4 min de lectura</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
