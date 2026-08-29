export type HeroJobIcon =
  | "brief"
  | "answer"
  | "follow-up"
  | "inbox"
  | "pages"
  | "renewal"
  | "pipeline"
  | "chief";

export type HeroJob = {
  name: string;
  icon: HeroJobIcon;
  account: string;
  signal: string;
  work: string;
  result: string;
  user: string;
  bot: string;
};

export const HERO_JOBS: HeroJob[] = [
  {
    name: "Meeting Prep",
    icon: "brief",
    account: "Sample account",
    signal: "A meeting is on the calendar",
    work: "I read the CRM record and the current product pages, then wrote a short brief you can check before the call.",
    result: "Meeting brief ready for review",
    user: "looks right. keep it open for the call",
    bot: "will do. i will update it if the meeting changes.",
  },
  {
    name: "Product Answers",
    icon: "answer",
    account: "Sample account",
    signal: "A product question landed in the inbox",
    work: "I pulled the answer from the current product pages and our last notes, then drafted a reply with the sources listed.",
    result: "Sourced reply ready for review",
    user: "send it after i read it",
    bot: "it stays a draft until you send it.",
  },
  {
    name: "Meeting Follow-up",
    icon: "follow-up",
    account: "Sample account",
    signal: "The meeting just ended",
    work: "I wrote a short note from the room, listed the next steps, and drafted the follow-up email.",
    result: "Follow-up draft ready for review",
    user: "send the note and book the next meeting",
    bot: "sent. the next meeting is on the calendar.",
  },
  {
    name: "Inbox Triage",
    icon: "inbox",
    account: "Sample account",
    signal: "New email on an open thread",
    work: "I read the thread, flagged the questions that need you, and drafted replies for the rest.",
    result: "Draft replies ready for review",
    user: "answer the easy ones, i will take the rest",
    bot: "done. the open questions are marked for you.",
  },
  {
    name: "Page Watch",
    icon: "pages",
    account: "Sample account",
    signal: "A Zillow product page changed",
    work: "A page changed since your last call. I noted what moved and where it touches your open accounts.",
    result: "Page change note ready",
    user: "add it to the next brief",
    bot: "added. the brief shows the change.",
  },
  {
    name: "Renewal Check",
    icon: "renewal",
    account: "Sample account",
    signal: "A renewal date is coming up",
    work: "I checked the account notes and the open items, then drafted a short plan for the renewal talk.",
    result: "Renewal plan ready for review",
    user: "share it with the account team",
    bot: "shared. i will flag anything that changes.",
  },
  {
    name: "Pipeline Review",
    icon: "pipeline",
    account: "Weekly pipeline review",
    signal: "Some deals have no next step",
    work: "I read the stage notes, found the deals with no next step, and drafted one for each.",
    result: "Next steps ready for review",
    user: "put them on my calendar",
    bot: "done. each deal has a next step now.",
  },
  {
    name: "Chief of Staff",
    icon: "chief",
    account: "Weekly review",
    signal: "Open items from the week",
    work: "I gathered the open items from your notes and email, then wrote the short list that needs your call.",
    result: "Weekly brief ready for review",
    user: "send it to the team",
    bot: "sent. next week's list is already started.",
  },
];
