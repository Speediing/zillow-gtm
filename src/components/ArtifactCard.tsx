import type { Artifact } from "@/data/types";

function SlideCards({ artifact }: { artifact: Extract<Artifact, { kind: "slides" }> }) {
  return (
    <div className="art art-doc">
      <p className="art-kicker">Sample data</p>
      <h3 className="art-title">{artifact.title}</h3>
      {artifact.cards.map((card) => (
        <div key={card.n} className="art-block">
          <p className="art-label">{card.kicker || card.title}</p>
          <p>{card.body}</p>
        </div>
      ))}
    </div>
  );
}

function MeetingBriefCard({
  artifact,
}: {
  artifact: Extract<Artifact, { kind: "meeting-brief" }>;
}) {
  return (
    <div className="art art-doc">
      <p className="art-kicker">{artifact.eyebrow || "Sample data"}</p>
      <h3 className="art-title">{artifact.title}</h3>
      <div className="art-block">
        <p className="art-label">When</p>
        <p>{artifact.when}</p>
      </div>
      <div className="art-block">
        <p className="art-label">With</p>
        <p>{artifact.with}</p>
      </div>
      <div className="art-block">
        <p className="art-label">Goal</p>
        <p>{artifact.goal}</p>
      </div>
      {artifact.pages.map((page) => (
        <div key={page.name} className="art-block">
          <p className="art-label">{page.name}</p>
          <p>{page.note}</p>
        </div>
      ))}
      {artifact.openItems.map((item) => (
        <div key={item} className="art-block">
          <p className="art-label">Open</p>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
}

function SourcedReplyCard({
  artifact,
}: {
  artifact: Extract<Artifact, { kind: "sourced-reply" }>;
}) {
  return (
    <div className="art art-gmail">
      <p className="art-kicker">{artifact.eyebrow || "Sample data"}</p>
      <p className="mail-row">
        <span>To</span>
        {artifact.to}
      </p>
      <p className="mail-row">
        <span>Subject</span>
        {artifact.subject}
      </p>
      <p className="mail-body">{artifact.body}</p>
      {artifact.sources.map((source) => (
        <div key={source.name} className="art-block">
          <p className="art-label">{source.name}</p>
          <p>{source.note}</p>
        </div>
      ))}
    </div>
  );
}

function FollowUpCard({
  artifact,
}: {
  artifact: Extract<Artifact, { kind: "follow-up-pack" }>;
}) {
  return (
    <div className="art art-doc">
      <p className="art-kicker">{artifact.eyebrow || "Sample data"}</p>
      <h3 className="art-title">{artifact.title}</h3>
      <div className="art-block">
        <p className="art-label">Note</p>
        <p>{artifact.note}</p>
      </div>
      <div className="art-block">
        <p className="art-label">Email</p>
        <p>
          {artifact.email.to}. {artifact.email.subject}. {artifact.email.body}
        </p>
      </div>
      {artifact.nextSteps.map((step) => (
        <div key={step} className="art-block">
          <p className="art-label">Next</p>
          <p>{step}</p>
        </div>
      ))}
    </div>
  );
}

export function ArtifactCard({ artifact }: { artifact: Artifact }) {
  switch (artifact.kind) {
    case "slides":
      return <SlideCards artifact={artifact} />;
    case "meeting-brief":
      return <MeetingBriefCard artifact={artifact} />;
    case "sourced-reply":
      return <SourcedReplyCard artifact={artifact} />;
    case "follow-up-pack":
      return <FollowUpCard artifact={artifact} />;
    default: {
      const exhaustive: never = artifact;
      return exhaustive;
    }
  }
}
