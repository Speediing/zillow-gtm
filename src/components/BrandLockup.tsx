import Image from "next/image";

const ZILLOW_MARK =
  "https://s.zillowstatic.com/pfs/static/z-logo-default.svg";

export function BrandLockup({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
  invert?: boolean;
}) {
  return (
    <div className={`brand-lockup brand-lockup-${size}`}>
      <Image
        src={ZILLOW_MARK}
        alt="Zillow"
        className="brand-z"
        width={77}
        height={18}
        unoptimized
      />
      <span className="brand-times" aria-hidden>
        ×
      </span>
      <Image
        src="/brand/spacexai.svg"
        alt="SpaceXAI"
        className="brand-sxai"
        width={104}
        height={13}
        unoptimized
      />
    </div>
  );
}
