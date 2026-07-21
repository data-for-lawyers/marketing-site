export type LegalBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

function normalizeBlock(raw: string): string {
  return raw.replace(/\s+/g, ' ').trim();
}

function isListItem(text: string): boolean {
  return /^\(([a-z]|[ivxlcdm]+)\)\s+/i.test(text);
}

function isHeading(text: string): boolean {
  if (!text || isListItem(text)) return false;
  if (text.length > 80) return false;
  if (/[.!?;:]$/.test(text)) return false;
  if (text.includes(' – ') || text.includes(' — ')) return false;
  const words = text.split(/\s+/);
  if (words.length > 10) return false;
  // Avoid classifying ordinary short sentences without punctuation as headings
  // when they start with a lowercase letter or a digit.
  if (/^[a-z0-9]/.test(text)) return false;
  return true;
}

/**
 * Turn pasted legal copy (blank-line separated) into structured blocks
 * so headings, paragraphs, and (a)/(i) lists render correctly.
 */
export function parseLegalBody(body: string): LegalBlock[] {
  const chunks = body
    .split(/\n\s*\n/)
    .map(normalizeBlock)
    .filter(Boolean);

  const blocks: LegalBlock[] = [];

  for (const chunk of chunks) {
    if (isListItem(chunk)) {
      const prev = blocks[blocks.length - 1];
      if (prev?.type === 'list') {
        prev.items.push(chunk);
      } else {
        blocks.push({ type: 'list', items: [chunk] });
      }
      continue;
    }

    if (isHeading(chunk)) {
      blocks.push({ type: 'heading', text: chunk });
      continue;
    }

    blocks.push({ type: 'paragraph', text: chunk });
  }

  return blocks;
}
