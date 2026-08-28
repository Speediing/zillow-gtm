export type ClipId =
  | "01-morning-inbox"
  | "02-prospecting-pg"
  | "03-slides-granola";

export type JobId =
  | "prepare-meeting"
  | "answer-question"
  | "finish-followup";

export type ParticipantRole = "you" | "bot";

export type Participant = {
  id: string;
  name: string;
  role: ParticipantRole;
  persona?: string;
  color?: string;
};

export type MessageKind = "text" | "draft" | "routine" | "handoff" | "system";

export type SlideVoice = "them" | "us";

export type SlideCard = {
  n: number;
  title: string;
  body: string;
  kicker?: string;
  voice?: SlideVoice;
};

export type StoryScene =
  | "call"
  | "demo"
  | "voice"
  | "notes"
  | "deck"
  | "map"
  | "inspect"
  | "launch"
  | "drill"
  | "send";

export type StoryVisual =
  | {
      kind: "calendar";
      title: string;
      when: string;
      with: string;
      note: string;
    }
  | {
      kind: "crm-record";
      account: string;
      fields: { label: string; value: string }[];
    }
  | {
      kind: "product-pages";
      pages: { name: string; note: string }[];
      status: string;
    }
  | {
      kind: "inbox-item";
      sender: string;
      subject: string;
      preview: string;
    }
  | {
      kind: "answers-found";
      sources: { name: string; answer: string }[];
      status: string;
    }
  | {
      kind: "reply-ready";
      to: string;
      subject: string;
      status: string;
    }
  | {
      kind: "meeting-notes";
      title: string;
      lines: string[];
    }
  | {
      kind: "document-draft";
      title: string;
      status: string;
      sections: string[];
    };

export type StoryBeat = {
  label: string;
  scene: StoryScene;
  when?: string;
  slides?: SlideCard[];
  artifact?: Artifact;
  visual?: StoryVisual;
};

export type Artifact =
  | {
      kind: "slides";
      title: string;
      cards: SlideCard[];
    }
  | {
      kind: "meeting-brief";
      title: string;
      eyebrow?: string;
      when: string;
      with: string;
      goal: string;
      pages: { name: string; note: string }[];
      openItems: string[];
    }
  | {
      kind: "sourced-reply";
      title: string;
      eyebrow?: string;
      to: string;
      subject: string;
      body: string;
      sources: { name: string; note: string }[];
    }
  | {
      kind: "follow-up-pack";
      title: string;
      eyebrow?: string;
      note: string;
      email: { to: string; subject: string; body: string };
      nextSteps: string[];
    };

export type DemoMessage = {
  id: string;
  from: string;
  kind: MessageKind;
  body?: string;
  draftLabel?: string;
  artifact?: Artifact;
  delayMs?: number;
};

export type DemoThread = {
  title: string;
  subtitle: string;
  participants: Participant[];
  messages: DemoMessage[];
};

export type Clip = {
  id: ClipId;
  file: string;
  poster: string;
  title: string;
  caption: string;
};

export type CroJob = {
  id: JobId;
  number: number;
  title: string;
  trigger: string;
  backgroundAction: string;
  problem: string;
  botJob: string;
  storyboard: StoryBeat[];
  unlock: string;
  outcome: string;
  clips: ClipId[];
  demo: DemoThread;
};
