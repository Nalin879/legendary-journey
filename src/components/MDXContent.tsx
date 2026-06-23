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
            <code key={key} className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
              {item.match[1]}
            </code>
          );
        } else if (item.type === 'link') {
          parts.push(
            <a key={key} href={item.match[2]} className="text-blue-600 hover:underline">
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
          <p key={`p-${i}`} className="mb-4 leading-relaxed text-gray-800">
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
          <p key={`p-${i}`} className="mb-4 leading-relaxed text-gray-800">
            {renderInline(buffer.join('\n'))}
          </p>
        );
        buffer = [];
      }
      elements.push(
        <h1 key={`h1-${i}`} className="text-4xl font-bold my-6 text-gray-900">
          {renderInline(line.slice(2))}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      if (buffer.length > 0) {
        elements.push(
          <p key={`p-${i}`} className="mb-4 leading-relaxed text-gray-800">
            {renderInline(buffer.join('\n'))}
          </p>
        );
        buffer = [];
      }
      elements.push(
        <h2 key={`h2-${i}`} className="text-3xl font-bold my-5 text-gray-900">
          {renderInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      if (buffer.length > 0) {
        elements.push(
          <p key={`p-${i}`} className="mb-4 leading-relaxed text-gray-800">
            {renderInline(buffer.join('\n'))}
          </p>
        );
        buffer = [];
      }
      elements.push(
        <h3 key={`h3-${i}`} className="text-2xl font-bold my-4 text-gray-900">
          {renderInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      // List item
      if (buffer.length > 0) {
        elements.push(
          <p key={`p-${i}`} className="mb-4 leading-relaxed text-gray-800">
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
        <ul key={`ul-${i}`} className="list-disc list-inside mb-4 text-gray-800 space-y-1">
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
          <p key={`p-${i}`} className="mb-4 leading-relaxed text-gray-800">
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
        <blockquote key={`blockquote-${i}`} className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4">
          {renderInline(quoteLines.join('\n'))}
        </blockquote>
      );
    } else if (line.startsWith('```')) {
      // Code block
      if (buffer.length > 0) {
        elements.push(
          <p key={`p-${i}`} className="mb-4 leading-relaxed text-gray-800">
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
        <pre key={`code-${i}`} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
          <code className="font-mono text-sm">{codeLines.join('\n')}</code>
        </pre>
      );
    } else {
      buffer.push(line);
    }
  }

  if (buffer.length > 0) {
    elements.push(
      <p key={`p-end`} className="mb-4 leading-relaxed text-gray-800">
        {renderInline(buffer.join('\n'))}
      </p>
    );
  }

  return <>{elements}</>;
}
