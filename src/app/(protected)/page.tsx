import Image from "next/image";
import { CompareTable } from "@/components/CompareTable";
import { AgentFleet } from "@/components/AgentFleet";
import { HeroDemo } from "@/components/HeroDemo";
import { HeroTelemetry } from "@/components/HeroTelemetry";
import { JobSection } from "@/components/JobSection";
import { QuoteWall } from "@/components/QuoteWall";
import { SiteNav } from "@/components/SiteNav";
import { JOBS } from "@/data/jobs";

export default function HomePage() {
  return (
    <main id="top">
      <div className="hero-panorama">
        <Image
          className="hero-watercolor-image"
          src="/brand/zillow-watercolor-hero.png"
          alt=""
          width={1536}
          height={1024}
          priority
          sizes="100vw"
        />
        <SiteNav />
        <div className="hero-paper">
          <div className="report-hero">
            <HeroTelemetry />
            <section className="hero">
              <HeroDemo />
            </section>
          </div>
        </div>
      </div>

      <div className="report">
        <AgentFleet />

        <section className="usecase-framing">
          <p className="eyebrow">Three sample use cases</p>
          <h2>
            Prepare for a meeting. Answer a product question. Finish the
            follow-up.
          </h2>
          <p>All three run on sample data.</p>
        </section>

        <div className="metric-grid">
          {JOBS.map((job) => (
            <a key={job.id} className="metric-card" href={`#${job.id}`}>
              <div className="metric-card-top">
                <p>Sample {String(job.number).padStart(2, "0")}</p>
              </div>
              <h2>{job.title}</h2>
              <p className="metric-trigger">
                Starts when {job.trigger.toLowerCase()}
              </p>
            </a>
          ))}
        </div>

        <div id="jobs">
          {JOBS.map((job) => (
            <JobSection key={job.id} job={job} />
          ))}
        </div>

        <CompareTable />
        <QuoteWall />
      </div>

      <footer className="site-footer">
        <div>
          <p className="footer-title">Cursor for Zillow</p>
          <p>Grok Bot for Zillow</p>
        </div>
        <address className="footer-contact">
          <strong>Mike Kelly</strong>
          <a href="mailto:michael.kelly@cursor.com">
            michael.kelly@cursor.com
          </a>
        </address>
      </footer>
    </main>
  );
}
