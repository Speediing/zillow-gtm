import type { JobId } from "./types";

export type FleetTab = {
  id: string;
  label: string;
};

export type FleetActivity = {
  id: string;
  activity: string;
  blurb: string;
  tabs: FleetTab[];
  jobId: JobId;
};

export const FLEET: FleetActivity[] = [
  {
    id: "next-meeting",
    activity: "Checking the next meeting",
    blurb: "Opens the calendar and reads what is next.",
    tabs: [
      { id: "calendar", label: "Calendar" },
      { id: "crm", label: "CRM" },
    ],
    jobId: "prepare-meeting",
  },
  {
    id: "latest-email",
    activity: "Opening the latest email",
    blurb: "Reads the inbox and flags what needs a reply.",
    tabs: [
      { id: "inbox", label: "Inbox" },
      { id: "notes", label: "Notes" },
    ],
    jobId: "answer-question",
  },
  {
    id: "product-pages",
    activity: "Checking Zillow product pages",
    blurb: "Opens the current listings, rentals, and financing pages.",
    tabs: [
      { id: "browser", label: "Browser" },
      { id: "notes", label: "Notes" },
    ],
    jobId: "prepare-meeting",
  },
  {
    id: "write-brief",
    activity: "Writing the brief",
    blurb: "Turns the calendar, CRM, and pages into a short brief.",
    tabs: [
      { id: "document", label: "Document" },
      { id: "crm", label: "CRM" },
    ],
    jobId: "prepare-meeting",
  },
  {
    id: "prepare-followup",
    activity: "Preparing the follow-up",
    blurb: "Writes the note and the email after the meeting.",
    tabs: [
      { id: "document", label: "Document" },
      { id: "inbox", label: "Inbox" },
    ],
    jobId: "finish-followup",
  },
];
