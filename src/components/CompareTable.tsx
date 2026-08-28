const TOOLS = [
  "Grok Bot",
  "Task agents",
  "Chat assistants",
  "Research tools",
] as const;

const ROWS: { label: string; values: string[] }[] = [
  {
    label: "What it is",
    values: [
      "An agent fleet with its own computers",
      "An agent for an assigned task",
      "An assistant inside a chat",
      "A tool for sourced answers",
    ],
  },
  {
    label: "What starts it",
    values: [
      "A meeting, an email, or a finished call",
      "You assign a task",
      "You write a prompt",
      "You ask a question",
    ],
  },
  {
    label: "What you get",
    values: [
      "A draft or artifact ready to review",
      "A completed task",
      "An answer, analysis, or draft",
      "A sourced research answer",
    ],
  },
];

export function CompareTable() {
  return (
    <section id="compare" className="compare">
      <h2>What changes with Grok Bot</h2>
      <p className="section-lede">
        The work starts when a trigger fires. A meeting, an email, or a
        finished call is enough.
      </p>
      <div className="compare-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">Capability</span>
              </th>
              {TOOLS.map((tool) => (
                <th key={tool} scope="col">
                  {tool}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.values.map((value, index) => (
                  <td key={TOOLS[index]}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
