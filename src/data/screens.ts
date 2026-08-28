import type { ClipId, JobId } from "./types";

export type SiteKind =
  | "calendar"
  | "crm"
  | "inbox"
  | "notes"
  | "browser"
  | "document"
  | "clip";

export type ChromeTab = {
  id: string;
  host: string;
  label: string;
};

export type ComputerBeat = {
  pill: string;
  host: string;
  path?: string;
  title: string;
  site: SiteKind;
  clip?: ClipId;
  tabs: ChromeTab[];
};

const calendar = { id: "calendar", host: "calendar.example", label: "Calendar" };
const crm = { id: "crm", host: "crm.example", label: "CRM" };
const inbox = { id: "inbox", host: "inbox.example", label: "Inbox" };
const notes = { id: "notes", host: "notes.example", label: "Notes" };
const browser = { id: "browser", host: "www.zillow.com", label: "Browser" };
const document = { id: "document", host: "docs.example", label: "Document" };

export const SCREENS: Record<JobId, Record<string, ComputerBeat>> = {
  "prepare-meeting": {
    m1: {
      pill: "Checking the next meeting",
      host: "calendar.example",
      path: "/today",
      title: "Today",
      site: "calendar",
      tabs: [calendar, crm, browser],
    },
    m2: {
      pill: "Opening the CRM record",
      host: "crm.example",
      path: "/accounts/sample",
      title: "Sample account",
      site: "crm",
      tabs: [calendar, crm, browser],
    },
    m3: {
      pill: "Checking Zillow product pages",
      host: "www.zillow.com",
      path: "/homes",
      title: "Homes for sale",
      site: "clip",
      clip: "03-slides-granola",
      tabs: [calendar, crm, browser],
    },
    m4: {
      pill: "Writing the brief",
      host: "docs.example",
      path: "/brief/sample-account",
      title: "Meeting brief",
      site: "document",
      tabs: [calendar, crm, document],
    },
    m5: {
      pill: "Brief parked. Nothing sent",
      host: "docs.example",
      path: "/brief/sample-account",
      title: "Meeting brief",
      site: "document",
      tabs: [calendar, crm, document],
    },
  },
  "answer-question": {
    m1: {
      pill: "Opening the latest email",
      host: "inbox.example",
      path: "/inbox",
      title: "Inbox",
      site: "inbox",
      tabs: [inbox, browser, notes],
    },
    m2: {
      pill: "Checking Zillow product pages",
      host: "www.zillow.com",
      path: "/homes",
      title: "Homes for sale",
      site: "clip",
      clip: "01-morning-inbox",
      tabs: [inbox, browser, notes],
    },
    m3: {
      pill: "Reading notes and product pages",
      host: "notes.example",
      path: "/sample-account",
      title: "Sample account notes",
      site: "notes",
      tabs: [inbox, browser, notes],
    },
    m4: {
      pill: "Drafting a sourced reply, not sent",
      host: "inbox.example",
      path: "/drafts",
      title: "Drafts",
      site: "inbox",
      tabs: [inbox, browser, notes],
    },
    m5: {
      pill: "Draft parked. Nothing sent",
      host: "inbox.example",
      path: "/drafts",
      title: "Drafts",
      site: "inbox",
      tabs: [inbox, browser, notes],
    },
  },
  "finish-followup": {
    m1: {
      pill: "Opening the meeting notes",
      host: "notes.example",
      path: "/sample-account/today",
      title: "Notes from today",
      site: "notes",
      tabs: [notes, document, inbox],
    },
    m2: {
      pill: "Writing the follow-up note",
      host: "docs.example",
      path: "/follow-up/sample-account",
      title: "Follow-up note",
      site: "clip",
      clip: "02-prospecting-pg",
      tabs: [notes, document, inbox],
    },
    m3: {
      pill: "Preparing the follow-up",
      host: "docs.example",
      path: "/follow-up/sample-account",
      title: "Follow-up note",
      site: "document",
      tabs: [notes, document, inbox],
    },
    m4: {
      pill: "Drafting the follow-up email, not sent",
      host: "inbox.example",
      path: "/drafts",
      title: "Drafts",
      site: "inbox",
      tabs: [notes, document, inbox],
    },
    m5: {
      pill: "Pack parked. Nothing sent",
      host: "docs.example",
      path: "/follow-up/sample-account",
      title: "Follow-up pack",
      site: "document",
      tabs: [notes, document, inbox],
    },
  },
};

export function beatFor(
  jobId: JobId,
  messageId: string | undefined,
): ComputerBeat | undefined {
  if (!messageId) return undefined;
  return SCREENS[jobId]?.[messageId];
}
