// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

interface SearchResult {
  name: string;
  industry: string;
  rank?: number;
  score?: number;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q')?.toLowerCase().trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const results: SearchResult[] = [];
  const dataDir = path.join(process.cwd(), 'data');

  if (!fs.existsSync(dataDir)) {
    return NextResponse.json({ results: [] });
  }

  // Читаем все CSV файлы индустрий
  const files = fs
    .readdirSync(dataDir)
    .filter(f => f.startsWith('for_site_') && f.endsWith('.csv'));

  for (const file of files) {
    const industry = file.replace('for_site_', '').replace('.csv', '');
    const filePath = path.join(dataDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Парсим БЕЗ заголовков
    const parsed = Papa.parse(content, {
      header: false, // Изменено с true на false
      skipEmptyLines: true,
    });

    parsed.data.forEach((row: any, index: number) => {
      // row - это массив [название, рейтинг]
      const name = row[0]?.toString().trim() || '';
      const score = row[1]?.toString().trim() || '';
      
      if (name && name.toLowerCase().includes(query)) {
        results.push({
          name,
          industry,
          rank: index + 1,
          score: parseFloat(score) || undefined,
        });
      }
    });
  }

  // Сортируем по релевантности (точное совпадение в начале)
  results.sort((a, b) => {
    const aStarts = a.name.toLowerCase().startsWith(query);
    const bStarts = b.name.toLowerCase().startsWith(query);
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return a.name.localeCompare(b.name);
  });

  // Ограничиваем результаты
  return NextResponse.json({ results: results.slice(0, 50) });
}
