import type { Artifact, DemoMessage } from "@/data/types";
import type { ComputerBeat } from "@/data/screens";
import { CLIPS } from "@/data/clips";

function asBrief(artifact?: Artifact) {
  return artifact?.kind === "meeting-brief" ? artifact : null;
}
function asReply(artifact?: Artifact) {
  return artifact?.kind === "sourced-reply" ? artifact : null;
}
function asFollow(artifact?: Artifact) {
  return artifact?.kind === "follow-up-pack" ? artifact : null;
}
function asSlides(artifact?: Artifact) {
  return artifact?.kind === "slides" ? artifact : null;
}

export function SiteScreen({
  beat,
  message,
  account,
  sent,
}: {
  beat: ComputerBeat;
  message?: DemoMessage;
  account: string;
  sent: boolean;
}) {
  const artifact = message?.artifact;

  if (beat.site === "clip" && beat.clip) {
    const clip = CLIPS[beat.clip];
    return (
      <div className="site-clip">
        <video
          src={clip.file}
          controls
          playsInline
          controlsList="nodownload"
          aria-label={clip.title}
        />
      </div>
    );
  }

  switch (beat.site) {
    case "calendar":
      return <CalendarScreen account={account} />;
    case "crm":
      return <CrmScreen account={account} />;
    case "inbox":
      return (
        <InboxScreen
          account={account}
          reply={asReply(artifact)}
          follow={asFollow(artifact)}
          sent={sent}
        />
      );
    case "notes":
      return <NotesScreen account={account} />;
    case "browser":
      return <BrowserScreen />;
    case "document":
      return (
        <DocumentScreen
          account={account}
          brief={asBrief(artifact)}
          follow={asFollow(artifact)}
          slides={asSlides(artifact)}
        />
      );
    default:
      return <NotesScreen account={account} />;
  }
}

function CalendarScreen({ account }: { account: string }) {
  return (
    <div className="site site-cal">
      <header>
        <strong>Calendar</strong>
        <span>Sample data</span>
      </header>
      <p className="site-time">Today</p>
      <ul>
        <li>
          <span>Next</span> Meeting with {account}
        </li>
        <li>
          <span>Later</span> Internal prep
        </li>
        <li>
          <span>After</span> Follow-up block
        </li>
      </ul>
    </div>
  );
}

function CrmScreen({ account }: { account: string }) {
  return (
    <div className="site site-crm">
      <header>
        <strong>CRM</strong>
        <span>Sample data</span>
      </header>
      <div className="crm-title">
        <p>Account</p>
        <h3>{account}</h3>
      </div>
      <dl className="crm-fields">
        <div>
          <dt>Next meeting</dt>
          <dd>On the calendar</dd>
        </div>
        <div>
          <dt>Stage</dt>
          <dd>Open conversation</dd>
        </div>
        <div>
          <dt>Owner</dt>
          <dd>You</dd>
        </div>
        <div>
          <dt>Source</dt>
          <dd>Sample data</dd>
        </div>
      </dl>
    </div>
  );
}

function InboxScreen({
  account,
  reply,
  follow,
  sent,
}: {
  account: string;
  reply: ReturnType<typeof asReply>;
  follow: ReturnType<typeof asFollow>;
  sent: boolean;
}) {
  const to = reply?.to || follow?.email.to || `${account} contact`;
  const subject =
    reply?.subject || follow?.email.subject || `Note for ${account}`;
  const body =
    reply?.body ||
    follow?.email.body ||
    "Draft parked here until you tap Send.";

  return (
    <div className="site site-inbox">
      <header>
        <strong>Inbox</strong>
        <em>{sent ? "Sent" : "Draft, not sent"}</em>
      </header>
      <p>
        <span>To</span>
        {to}
      </p>
      <p>
        <span>Subject</span>
        {subject}
      </p>
      <div>{body}</div>
    </div>
  );
}

function NotesScreen({ account }: { account: string }) {
  return (
    <div className="site site-notes">
      <header>
        <strong>Notes</strong>
        <span>Sample data</span>
      </header>
      <p className="site-time">Working notes for {account}</p>
      <ul>
        <li>
          <span>Open</span> Questions from the last meeting.
        </li>
        <li>
          <span>Pages</span> Product pages to walk through.
        </li>
        <li>
          <span>Draft</span> Follow-up still needs a written note.
        </li>
      </ul>
    </div>
  );
}

function BrowserScreen() {
  return (
    <div className="site site-research">
      <header>
        <strong>zillow.com</strong>
        <span>Product pages</span>
      </header>
      <p className="site-time">Sample data. Current public pages.</p>
      <ul>
        <li>
          <span>Homes</span> Homes for sale.
        </li>
        <li>
          <span>Rentals</span> Rentals.
        </li>
        <li>
          <span>Mortgages</span> Financing.
        </li>
      </ul>
    </div>
  );
}

function DocumentScreen({
  account,
  brief,
  follow,
  slides,
}: {
  account: string;
  brief: ReturnType<typeof asBrief>;
  follow: ReturnType<typeof asFollow>;
  slides: ReturnType<typeof asSlides>;
}) {
  return (
    <div className="site site-document">
      <header>
        <strong>Document</strong>
        <span>
          {brief?.title || follow?.title || slides?.title || `${account} brief`}
        </span>
      </header>
      <article>
        {brief ? (
          <>
            <p>
              <b>When.</b> {brief.when}
            </p>
            <p>
              <b>With.</b> {brief.with}
            </p>
            <p>
              <b>Goal.</b> {brief.goal}
            </p>
            {brief.pages.map((page) => (
              <p key={page.name}>
                <b>{page.name}.</b> {page.note}
              </p>
            ))}
          </>
        ) : follow ? (
          <>
            <p>
              <b>Note.</b> {follow.note}
            </p>
            <p>
              <b>Email.</b> {follow.email.subject}
            </p>
            {follow.nextSteps.map((step) => (
              <p key={step}>{step}</p>
            ))}
          </>
        ) : slides ? (
          slides.cards.map((card) => (
            <p key={card.n}>
              <b>{card.title}.</b> {card.body}
            </p>
          ))
        ) : (
          <p>Working note for {account}. Sample data.</p>
        )}
      </article>
    </div>
  );
}
