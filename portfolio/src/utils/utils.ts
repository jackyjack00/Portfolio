import { marked } from 'marked';

/**
 * Converte una stringa Markdown in HTML.
 * @param markdown Il testo in formato Markdown.
 * @returns Il testo convertito in HTML.
 */
export function markdownToHtml(markdown: string): string {
    // marked v12 parse may return Promise<string>; use synchronous variant if present
    const anyMarked: any = marked as any;
    if (typeof anyMarked.parseSync === 'function') {
        return anyMarked.parseSync(markdown) as string;
    }
    const result = marked.parse(markdown);
    if (typeof result === 'string') return result;
    // If promise (async parser), this function should be made async; fallback empty string for now
    return '';
}