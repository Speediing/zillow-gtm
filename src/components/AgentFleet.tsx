import { FLEET, type FleetActivity } from "@/data/fleet";

function Workstation({ item }: { item: FleetActivity }) {
  return (
    <a className="fleet-card" href={`#${item.jobId}`}>
      <div className="fleet-chrome" aria-hidden>
        <span className="traffic">
          <i />
          <i />
          <i />
        </span>
        <div className="fleet-tabs">
          {item.tabs.map((tab, index) => (
            <span key={tab.id} className={index === 0 ? "is-active" : undefined}>
              {tab.label}
            </span>
          ))}
        </div>
      </div>
      <div className="fleet-screen">
        <p className="fleet-status">
          <span aria-hidden />
          Agent working
        </p>
        <p className="fleet-activity">{item.activity}</p>
        <p className="fleet-blurb">{item.blurb}</p>
      </div>
    </a>
  );
}

export function AgentFleet() {
  return (
    <section id="roster" className="roster">
      <p className="eyebrow">Agents at work</p>
      <h2>A fleet with its own computers.</h2>
      <p className="section-lede">
        Each agent opens the tools it needs and leaves the work ready for you.
      </p>
      <div className="fleet-grid">
        {FLEET.map((item) => (
          <Workstation key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
