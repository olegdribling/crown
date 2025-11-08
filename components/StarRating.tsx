import Star from "./Star";

export default function StarRating({ value }: { value: number }) {
  const v = Math.max(0, Math.min(10, value)); // ограничение 0–10
  const full = Math.floor(v);
  const frac = v - full;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-[2px] items-center">
        {Array.from({ length: 10 }).map((_, i) => {
          // если звезда полностью закрашена
          if (i < full) {
            return (
              <span key={i} className="text-[#EDBF4A]">
                <Star />
              </span>
            );
          }

          // если звезда частично закрашена (первая после полных)
          if (i === full && frac > 0) {
            return (
              <span key={i} className="relative inline-block align-middle">
                <span className="text-gray-300">
                  <Star />
                </span>
                <span
                  className="absolute left-0 top-0 overflow-hidden"
                  style={{ width: `${frac * 100}%`, color: "#EDBF4A" }}
                >
                  <Star />
                </span>
              </span>
            );
          }

          // пустые серые звезды
          return (
            <span key={i} className="text-gray-300">
              <Star />
            </span>
          );
        })}
      </div>
      <span className="text-lg font-semibold tabular-nums">{v.toFixed(1)}</span>
    </div>
  );
}

