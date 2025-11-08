import Image from "next/image";
import StarRating from "./StarRating";

export default function CompanyCard({
  name,
  rating,
  index,
}: {
  name: string;
  rating: number;
  index: number;
}) {
  // выбор иконки по месту
  let icon = "/laureate.png";
  if (index === 0) icon = "/gold.png";
  else if (index === 1) icon = "/silver.png";
  else if (index === 2) icon = "/bronze.png";

  return (
    <div className="border rounded-xl bg-white shadow-sm hover:shadow-md transition p-4 md:p-5 flex gap-4 items-center">
      <div className="shrink-0">
        <Image
          src={icon}
          alt="Award Icon"
          width={72}
          height={72}
          className="rounded-lg"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-lg md:text-xl font-extrabold leading-tight truncate">
          {name}
        </div>
        <div className="mt-2">
          <StarRating value={rating} />
        </div>
      </div>
    </div>
  );
}

