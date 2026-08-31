import type { Artifact, CroJob } from "./types";

export const MEETING_BRIEF: Extract<Artifact, { kind: "meeting-brief" }> = {
  kind: "meeting-brief",
  title: "Meeting brief",
  eyebrow: "Sample data",
  when: "Before the meeting",
  with: "Sample account",
  goal: "Walk through the open questions and the current product pages.",
  pages: [
    {
      name: "Homes for sale",
      note: "Open this if the talk is about listings.",
    },
    {
      name: "Rentals",
      note: "Open this if the talk turns to rentals.",
    },
    {
      name: "Mortgages",
      note: "Open this only if they ask about financing.",
    },
  ],
  openItems: [
    "Confirm who from their side will join.",
    "Bring the current product pages, not last month's notes.",
    "Leave time for questions at the end.",
  ],
};

export const SOURCED_REPLY: Extract<Artifact, { kind: "sourced-reply" }> = {
  kind: "sourced-reply",
  title: "Sourced reply",
  eyebrow: "Sample data",
  to: "Sample contact",
  subject: "Answers to your product questions",
  body: "Thanks for the note. I pulled the answers from the current product pages and our last notes. Please review this draft before it goes out.",
  sources: [
    {
      name: "Product page",
      note: "How a listing is shown on Zillow.",
    },
    {
      name: "Help page",
      note: "Steps to update a listing.",
    },
    {
      name: "Notes",
      note: "The same question came up in the last meeting.",
    },
  ],
};

export const FOLLOW_UP_PACK: Extract<Artifact, { kind: "follow-up-pack" }> = {
  kind: "follow-up-pack",
  title: "Follow-up pack",
  eyebrow: "Sample data",
  note: "Thanks for the time today. We covered the open questions and the pages to review next. This note is a draft until you send it.",
  email: {
    to: "Sample contact",
    subject: "Follow-up from today",
    body: "Thanks for meeting. Here is a short note from the room and the next steps. Please review this draft before I send it.",
  },
  nextSteps: [
    "Send the note after you review it.",
    "Put the next meeting on the calendar.",
    "Share the product pages we opened.",
  ],
};

export const JOBS: CroJob[] = [
  {
    id: "prepare-meeting",
    number: 1,
    title: "Prepare for a customer meeting",
    trigger: "A meeting is on the calendar",
    backgroundAction: "Checking the calendar, CRM, and product pages",
    problem:
      "The next meeting is on the calendar. The brief is not ready. You should not have to click through five tabs to get current.",
    botJob:
      "Grok Bot opens the calendar, reads the CRM, and checks the product pages. It writes a short brief you can take into the room.",
    storyboard: [
      {
        when: "This morning",
        label: "The next meeting is on the calendar.",
        scene: "call",
        visual: {
          kind: "calendar",
          title: "Calendar",
          when: "Next customer meeting",
          with: "Sample account",
          note: "Sample data. Next customer meeting.",
        },
      },
      {
        when: "A few minutes later",
        label: "The CRM record is open for the same account.",
        scene: "inspect",
        visual: {
          kind: "crm-record",
          account: "Sample account",
          fields: [
            { label: "Next meeting", value: "On the calendar" },
            { label: "Stage", value: "Open conversation" },
            { label: "Owner", value: "You" },
            { label: "Source", value: "Sample data" },
          ],
        },
      },
      {
        when: "Still before the call",
        label: "Product pages are open so the brief can name the right ones.",
        scene: "demo",
        visual: {
          kind: "product-pages",
          status: "Pages open",
          pages: [
            { name: "Homes for sale", note: "Listings" },
            { name: "Rentals", note: "Rentals" },
            { name: "Mortgages", note: "Financing" },
          ],
        },
      },
      {
        when: "Ready for you",
        label: "The meeting brief is complete.",
        scene: "deck",
        artifact: MEETING_BRIEF,
      },
    ],
    unlock: "A short brief before you join. Calendar, CRM, and product pages already open.",
    outcome: "A meeting brief is ready before you join.",
    clips: ["03-slides-granola"],
    demo: {
      title: "Meeting brief",
      subtitle: "Calendar to a ready brief",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "brief",
          name: "Grok Bot",
          role: "bot",
          persona: "Checks the next meeting and writes the brief",
          color: "#006AFF",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "brief",
          kind: "routine",
          body: "A meeting with Sample account is on the calendar. Opening the calendar first.",
        },
        {
          id: "m2",
          from: "brief",
          kind: "text",
          body: "The CRM record is open. Same account. I am reading the last notes and the open items.",
        },
        {
          id: "m3",
          from: "brief",
          kind: "text",
          body: "The product pages are open. I will only name the pages that fit this meeting.",
        },
        {
          id: "m4",
          from: "brief",
          kind: "draft",
          draftLabel: "Meeting brief",
          artifact: MEETING_BRIEF,
        },
        {
          id: "m5",
          from: "brief",
          kind: "system",
          body: "Nothing sent. The brief stays a draft until you take it into the room.",
        },
      ],
    },
  },
  {
    id: "answer-question",
    number: 2,
    title: "Answer a product question",
    trigger: "A product question lands in the inbox",
    backgroundAction: "Searching product pages and writing a sourced reply",
    problem:
      "A product question sits in the inbox. Finding the right page and writing a clear reply can take the morning.",
    botJob:
      "Grok Bot opens the inbox, checks the product pages, and drafts a reply with sources. You review it before it goes out.",
    storyboard: [
      {
        when: "Morning",
        label: "A product question is in the inbox.",
        scene: "notes",
        visual: {
          kind: "inbox-item",
          sender: "Sample contact",
          subject: "Product questions",
          preview: "Sample data. Can you point us to the right pages?",
        },
      },
      {
        when: "A little later",
        label: "The product pages and notes are already open.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          status: "Sources ready",
          sources: [
            { name: "Product page", answer: "How a listing is shown" },
            { name: "Help page", answer: "How to update a listing" },
            { name: "Notes", answer: "Same question last meeting" },
          ],
        },
      },
      {
        when: "Still morning",
        label: "A sourced reply is waiting for your review.",
        scene: "send",
        visual: {
          kind: "reply-ready",
          to: "Sample contact",
          subject: "Answers to your product questions",
          status: "Ready to review",
        },
      },
      {
        when: "Ready for you",
        label: "The sourced reply is complete.",
        scene: "send",
        artifact: SOURCED_REPLY,
      },
    ],
    unlock: "A product question in. A sourced draft out. You still tap send.",
    outcome: "A sourced reply is waiting for your review.",
    clips: ["01-morning-inbox"],
    demo: {
      title: "Product reply",
      subtitle: "Inbox to a sourced draft",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "reply",
          name: "Grok Bot",
          role: "bot",
          persona: "Opens the latest email and drafts a sourced reply",
          color: "#006AFF",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "reply",
          kind: "routine",
          body: "A product question landed in the inbox. Opening it now.",
        },
        {
          id: "m2",
          from: "reply",
          kind: "text",
          body: "The question is about listings. I am checking the current product page and the help page.",
        },
        {
          id: "m3",
          from: "reply",
          kind: "text",
          body: "Sources are ready. Product page, help page, and the last meeting notes. Drafting the reply.",
        },
        {
          id: "m4",
          from: "reply",
          kind: "draft",
          draftLabel: "Sourced reply",
          artifact: SOURCED_REPLY,
        },
        {
          id: "m5",
          from: "reply",
          kind: "system",
          body: "Nothing sent. The reply stays a draft until you tap Send.",
        },
      ],
    },
  },
  {
    id: "finish-followup",
    number: 3,
    title: "Finish the follow-up",
    trigger: "A meeting ends",
    backgroundAction: "Writing the note and the follow-up email",
    problem:
      "The meeting is over. The note and the email are still blank.",
    botJob:
      "Grok Bot writes a short note and a follow-up email. Both stay drafts until you send.",
    storyboard: [
      {
        when: "Right after the call",
        label: "The meeting notes are open.",
        scene: "notes",
        visual: {
          kind: "meeting-notes",
          title: "Notes",
          lines: [
            "Covered the open questions.",
            "Walked through the current product pages.",
            "A written follow-up is still open.",
          ],
        },
      },
      {
        when: "A few minutes later",
        label: "The follow-up note is in progress.",
        scene: "deck",
        visual: {
          kind: "document-draft",
          title: "Follow-up note",
          status: "Writing",
          sections: ["Thanks", "From the meeting", "Next steps"],
        },
      },
      {
        when: "Still the same hour",
        label: "The email draft is open next to the note.",
        scene: "send",
        visual: {
          kind: "reply-ready",
          to: "Sample contact",
          subject: "Follow-up from today",
          status: "Draft, not sent",
        },
      },
      {
        when: "Ready for you",
        label: "The follow-up pack is complete.",
        scene: "send",
        artifact: FOLLOW_UP_PACK,
      },
    ],
    unlock: "A note and an email after the meeting. Nothing goes out until you send.",
    outcome: "A follow-up pack is ready for your review.",
    clips: ["02-prospecting-pg"],
    demo: {
      title: "Follow-up",
      subtitle: "Notes to a sendable pack",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "follow",
          name: "Grok Bot",
          role: "bot",
          persona: "Prepares the follow-up note and email",
          color: "#006AFF",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "follow",
          kind: "routine",
          body: "The meeting with Sample account just ended. Opening the notes.",
        },
        {
          id: "m2",
          from: "follow",
          kind: "text",
          body: "Notes are open. I am writing a short follow-up note from what was covered.",
        },
        {
          id: "m3",
          from: "follow",
          kind: "text",
          body: "The note is in the document. Drafting the email next to it. Nothing sent.",
        },
        {
          id: "m4",
          from: "follow",
          kind: "draft",
          draftLabel: "Follow-up pack",
          artifact: FOLLOW_UP_PACK,
        },
        {
          id: "m5",
          from: "follow",
          kind: "system",
          body: "Nothing sent. The note and the email stay drafts until you tap Send.",
        },
      ],
    },
  },
];

export function getJob(id: string): CroJob | undefined {
  return JOBS.find((job) => job.id === id);
}
