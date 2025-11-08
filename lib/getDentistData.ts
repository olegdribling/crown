// lib/getDentistData.ts
import { readFile } from "fs/promises";
import { parse } from "csv-parse/sync";

export type CompanyRow = {
  company: string;
  rating: number;
};

export async function getDentistData(): Promise<CompanyRow[]> {
  const file = await readFile(process.cwd() + "/data/for_site_dentist.csv");
  const rows = parse(file, {
    columns: ["company", "rating"],
    skip_empty_lines: true,
    trim: true,
  }) as { company: string; rating: string }[];

  const out: CompanyRow[] = rows
    .map(r => ({
      company: r.company?.trim(),
      rating: Number(String(r.rating).replace(",", ".")),
    }))
    .filter(r => r.company && Number.isFinite(r.rating));

  // сортировка по убыванию рейтинга
  out.sort((a, b) => b.rating - a.rating);
  return out;
}

