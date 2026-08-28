import type { Artifact, StoryBeat } from "@/data/types";

function MeetingBriefPack({
  artifact,
}: {
  artifact: Extract<Artifact, { kind: "meeting-brief" }>;
}) {
  return (
    <div className="leave leave-brief">
      <header className="leave-brief-top">
        <div>
          <p className="leave-kicker">{artifact.eyebrow || "Sample data"}</p>
          <h3>{artifact.title}</h3>
        </div>
        <p className="leave-stamp">{artifact.when}</p>
      </header>
      <p className="leave-brief-meta">
        With {artifact.with}. {artifact.goal}
      </p>
      <ol className="leave-pages">
        {artifact.pages.map((page) => (
          <li key={page.name}>
            <strong>{page.name}</strong>
            <span>{page.note}</span>
          </li>
        ))}
      </ol>
      <ul className="leave-open">
        {artifact.openItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function SourcedReplyPack({
  artifact,
}: {
  artifact: Extract<Artifact, { kind: "sourced-reply" }>;
}) {
  return (
    <div className="leave leave-sourced">
      <header className="leave-sourced-top">
        <div>
          <p className="leave-kicker">{artifact.eyebrow || "Sample data"}</p>
          <h3>{artifact.title}</h3>
        </div>
        <p className="leave-stamp">Not sent</p>
      </header>
      <div className="leave-sourced-split">
        <section className="leave-reply">
          <p className="leave-kicker">Draft reply</p>
          <p className="leave-reply-meta">
            <span>To</span>
            {artifact.to}
          </p>
          <p className="leave-reply-meta">
            <span>Subject</span>
            {artifact.subject}
          </p>
          <p className="leave-reply-body">{artifact.body}</p>
        </section>
        <section className="leave-marks">
          <p className="leave-kicker">Sources</p>
          <ol>
            {artifact.sources.map((source) => (
              <li key={source.name} className="is-take">
                <p className="leave-mark-line">{source.name}</p>
                <p className="leave-mark-note">{source.note}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}

function FollowUpPack({
  artifact,
}: {
  artifact: Extract<Artifact, { kind: "follow-up-pack" }>;
}) {
  return (
    <div className="leave leave-follow">
      <header className="leave-follow-top">
        <div>
          <p className="leave-kicker">{artifact.eyebrow || "Sample data"}</p>
          <h3>{artifact.title}</h3>
        </div>
        <p className="leave-stamp">Draft</p>
      </header>
      <div className="leave-follow-grid">
        <section>
          <p className="leave-kicker">Note</p>
          <p className="leave-follow-note">{artifact.note}</p>
        </section>
        <section className="leave-reply">
          <p className="leave-kicker">Email</p>
          <p className="leave-reply-meta">
            <span>To</span>
            {artifact.email.to}
          </p>
          <p className="leave-reply-meta">
            <span>Subject</span>
            {artifact.email.subject}
          </p>
          <p className="leave-reply-body">{artifact.email.body}</p>
        </section>
      </div>
      <ol className="leave-next">
        {artifact.nextSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

function SlidePack({
  title,
  cards,
}: {
  title: string;
  cards: NonNullable<StoryBeat["slides"]>;
}) {
  return (
    <div className="leave leave-brief">
      <header className="leave-brief-top">
        <div>
          <p className="leave-kicker">Sample data</p>
          <h3>{title}</h3>
        </div>
      </header>
      <ol className="leave-pages">
        {cards.map((card) => (
          <li key={card.n}>
            <strong>{card.title}</strong>
            <span>{card.body}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ChapterPayoff({
  beat,
  value,
}: {
  beat: StoryBeat;
  value?: string;
}) {
  const slides = beat.slides;
  const artifact = beat.artifact;

  let body = null;
  if (artifact?.kind === "meeting-brief") {
    body = <MeetingBriefPack artifact={artifact} />;
  } else if (artifact?.kind === "sourced-reply") {
    body = <SourcedReplyPack artifact={artifact} />;
  } else if (artifact?.kind === "follow-up-pack") {
    body = <FollowUpPack artifact={artifact} />;
  } else if (artifact?.kind === "slides") {
    body = <SlidePack title={artifact.title} cards={artifact.cards} />;
  } else if (slides?.length) {
    body = <SlidePack title={beat.label} cards={slides} />;
  }

  if (!body) return null;

  return (
    <div className="chapter-payoff">
      <p className="payoff-label">
        {beat.when ? <span>{beat.when}</span> : null}
        {beat.label}
      </p>
      <div className="payoff-art">
        {body}
      </div>
      {value ? <p className="leave-value">{value}</p> : null}
    </div>
  );
}
