import { readFile } from "fs/promises";
import { parse } from "csv-parse/sync";

export type CompanyRow = {
  company: string;
  rating: number;
};

export async function getIndustryData(slug: string | undefined): Promise<CompanyRow[]> {
  console.log("📂 [getIndustryData] slug =", slug);
  if (!slug) return []; // если параметр не пришёл — возвращаем пустой массив
  const path = `${process.cwd()}/data/for_site_${slug}.csv`;
  console.log("📄 [getIndustryData] path =", path);

  
  const file = await readFile(path);
  const rows = parse(file, {
    columns: false,
    skip_empty_lines: true,
    trim: true,
  }) as string[][];

  const out: CompanyRow[] = rows
    .map(r => ({
      company: r[0]?.trim(),
      rating: Number(r[1]),
    }))
    .filter(r => r.company && Number.isFinite(r.rating));

  out.sort((a, b) => b.rating - a.rating);
  return out;
}

