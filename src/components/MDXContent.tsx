import React from 'react';

interface MDXContentProps {
  content: string;
}

/**
 * Simple MDX/Markdown renderer
 * Converts markdown to HTML-like JSX
 */
export function MDXContent({ content }: MDXContentProps) {
  // Split by lines and render paragraphs/headings
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let buffer: string[] = [];

  const renderInline = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let keyCounter = 0;

    // Process bold and links in sequence
    const boldRegex = /\*\*(.*?)\*\*/g;
    const italicRegex = /\*(.*?)\*/g;
    const codeRegex = /`([^`]+)`/g;
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

    // Combine and sort all matches
    const matches: Array<{ start: number; end: number; type: string; match: RegExpExecArray }> = [];

    let match;
    while ((match = boldRegex.exec(text)) !== null) {
      matches.push({ start: match.index, end: match.index + match[0].length, type: 'bold', match });
    }

    while ((match = linkRegex.exec(text)) !== null) {
      matches.push({ start: match.index, end: match.index + match[0].length, type: 'link', match });
    }

    while ((match = codeRegex.exec(text)) !== null) {
      matches.push({ start: match.index, end: match.index + match[0].length, type: 'code', match });
    }

    while ((match = italicRegex.exec(text)) !== null) {
      matches.push({ start: match.index, end: match.index + match[0].length, type: 'italic', match });
    }

    // Sort by position
    matches.sort((a, b) => a.start - b.start);

    let lastEnd = 0;
    for (const item of matches) {
      if (item.start >= lastEnd) {
        // Add plain text before match
        if (item.start > lastEnd) {
          parts.push(text.slice(lastEnd, item.start));
        }

        const key = `inline-${keyCounter++}`;
        if (item.type === 'bold') {
          parts.push(<strong key={key}>{item.match[1]}</strong>);
        } else if (item.type === 'italic') {
          parts.push(<em key={key}>{item.match[1]}</em>);
        } else if (item.type === 'code') {
          parts.push(
            <code key={key} className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-900 dark:bg-gray-800 dark:text-gray-100">
              {item.match[1]}
            </code>
          );
        } else if (item.type === 'link') {
          parts.push(
            <a key={key} href={item.match[2]} className="text-blue-600 underline-offset-2 hover:underline dark:text-blue-400">
              {item.match[1]}
            </a>
          );
        }
        lastEnd = item.end;
      }
    }

    // Add remaining text
    if (lastEnd < text.length) {
      parts.push(text.slice(lastEnd));
    }

    return parts.length ? parts : [text];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] || '';

    // Skip empty lines at the end of buffer
    if (line.trim() === '') {
      if (buffer.length > 0) {
        elements.push(
          <p key={`p-${i}`} className="mb-4 leading-relaxed text-gray-800 dark:text-gray-200">
            {renderInline(buffer.join('\n'))}
          </p>
        );
        buffer = [];
      }
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      if (buffer.length > 0) {
        elements.push(
          <p key={`p-${i}`} className="mb-4 leading-relaxed text-gray-800 dark:text-gray-200">
            {renderInline(buffer.join('\n'))}
          </p>
        );
        buffer = [];
      }
      elements.push(
        <h1 key={`h1-${i}`} className="my-6 text-[34px] font-bold text-gray-900 sm:text-4xl dark:text-white">
          {renderInline(line.slice(2))}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      if (buffer.length > 0) {
        elements.push(
          <p key={`p-${i}`} className="mb-4 leading-relaxed text-gray-800 dark:text-gray-200">
            {renderInline(buffer.join('\n'))}
          </p>
        );
        buffer = [];
      }
      elements.push(
        <h2 key={`h2-${i}`} className="my-5 text-[28px] font-bold text-gray-900 sm:text-3xl dark:text-white">
          {renderInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      if (buffer.length > 0) {
        elements.push(
          <p key={`p-${i}`} className="mb-4 leading-relaxed text-gray-800 dark:text-gray-200">
            {renderInline(buffer.join('\n'))}
          </p>
        );
        buffer = [];
      }
      elements.push(
        <h3 key={`h3-${i}`} className="my-4 text-[22px] font-bold text-gray-900 sm:text-2xl dark:text-white">
          {renderInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      // List item
      if (buffer.length > 0) {
        elements.push(
          <p key={`p-${i}`} className="mb-4 leading-relaxed text-gray-800 dark:text-gray-200">
            {renderInline(buffer.join('\n'))}
          </p>
        );
        buffer = [];
      }
      const liItems: string[] = [line.slice(2)];
      while (i + 1 < lines.length && (lines[i + 1] || '').startsWith('- ')) {
        i++;
        liItems.push((lines[i] || '').slice(2));
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside mb-4 text-gray-800 dark:text-gray-200 space-y-1">
          {liItems.map((item, idx) => (
            <li key={idx} className="ml-4">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
    } else if (line.startsWith('> ')) {
      // Blockquote
      if (buffer.length > 0) {
        elements.push(
          <p key={`p-${i}`} className="mb-4 leading-relaxed text-gray-800 dark:text-gray-200">
            {renderInline(buffer.join('\n'))}
          </p>
        );
        buffer = [];
      }
      const quoteLines: string[] = [line.slice(2)];
      while (i + 1 < lines.length && (lines[i + 1] || '').startsWith('> ')) {
        i++;
        quoteLines.push((lines[i] || '').slice(2));
      }
      elements.push(
        <blockquote key={`blockquote-${i}`} className="border-l-4 border-gray-300 pl-4 italic text-gray-700 dark:border-gray-600 dark:text-gray-300 my-4">
          {renderInline(quoteLines.join('\n'))}
        </blockquote>
      );
    } else if (line.startsWith('```')) {
      // Code block
      if (buffer.length > 0) {
        elements.push(
          <p key={`p-${i}`} className="mb-4 leading-relaxed text-gray-800 dark:text-gray-200">
            {renderInline(buffer.join('\n'))}
          </p>
        );
        buffer = [];
      }
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i]?.startsWith('```')) {
        codeLines.push(lines[i] || '');
        i++;
      }
      elements.push(
        <pre key={`code-${i}`} className="my-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100 dark:bg-gray-800 dark:text-gray-100">
          <code className="font-mono text-sm">{codeLines.join('\n')}</code>
        </pre>
      );
    } else {
      buffer.push(line);
    }
  }

  if (buffer.length > 0) {
    elements.push(
      <p key={`p-end`} className="mb-4 leading-relaxed text-gray-800 dark:text-gray-200">
        {renderInline(buffer.join('\n'))}
      </p>
    );
  }

  return <>{elements}</>;
}
