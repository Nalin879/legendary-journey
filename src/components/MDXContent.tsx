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
    let lastIndex = 0;

    // Handle bold, italic, code
    const patterns = [
      { regex: /\*\*(.*?)\*\*/g, tag: 'strong' },
      { regex: /\*(.*?)\*/g, tag: 'em' },
      { regex: /`(.*?)`/g, tag: 'code' },
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(text.slice(lastIndex, match.index));
        }
        if (pattern.tag === 'strong') {
          parts.push(<strong key={`${lastIndex}-${match.index}`}>{match[1]}</strong>);
        } else if (pattern.tag === 'em') {
          parts.push(<em key={`${lastIndex}-${match.index}`}>{match[1]}</em>);
        } else if (pattern.tag === 'code') {
          parts.push(
            <code key={`${lastIndex}-${match.index}`} className="bg-gray-100 px-1 py-0.5 rounded text-sm">
              {match[1]}
            </code>
          );
        }
        lastIndex = pattern.regex.lastIndex;
      }
      pattern.regex.lastIndex = 0;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length ? parts : [text];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] || '';

    // Headings
    if (line.startsWith('# ')) {
      if (buffer.length > 0) {
        elements.push(
          <p key={`p-${i}`} className="mb-4 leading-relaxed">
            {renderInline(buffer.join('\n'))}
          </p>
        );
        buffer = [];
      }
      elements.push(
        <h1 key={`h1-${i}`} className="text-4xl font-bold my-6">
          {renderInline(line.slice(2))}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      if (buffer.length > 0) {
        elements.push(
          <p key={`p-${i}`} className="mb-4 leading-relaxed">
            {renderInline(buffer.join('\n'))}
          </p>
        );
        buffer = [];
      }
      elements.push(
        <h2 key={`h2-${i}`} className="text-3xl font-bold my-5">
          {renderInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      if (buffer.length > 0) {
        elements.push(
          <p key={`p-${i}`} className="mb-4 leading-relaxed">
            {renderInline(buffer.join('\n'))}
          </p>
        );
        buffer = [];
      }
      elements.push(
        <h3 key={`h3-${i}`} className="text-2xl font-bold my-4">
          {renderInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      // List item
      if (buffer.length > 0) {
        elements.push(
          <p key={`p-${i}`} className="mb-4 leading-relaxed">
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
        <ul key={`ul-${i}`} className="list-disc list-inside mb-4">
          {liItems.map((item, idx) => (
            <li key={idx} className="ml-4">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
    } else if (line.trim() === '') {
      if (buffer.length > 0) {
        elements.push(
          <p key={`p-${i}`} className="mb-4 leading-relaxed">
            {renderInline(buffer.join('\n'))}
          </p>
        );
        buffer = [];
      }
    } else {
      buffer.push(line);
    }
  }

  if (buffer.length > 0) {
    elements.push(
      <p key={`p-end`} className="mb-4 leading-relaxed">
        {renderInline(buffer.join('\n'))}
      </p>
    );
  }

  return <>{elements}</>;
}
