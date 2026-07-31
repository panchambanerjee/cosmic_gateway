import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function MarkdownBody({
  markdown,
  className = "prose-cosmo mt-8",
}: {
  markdown: string;
  className?: string;
}) {
  const blocks = markdown.split(/\n\n+/);

  return (
    <div className={className}>
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={index}>{trimmed.replace(/^###\s+/, "")}</h3>
          );
        }

        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={index}>{trimmed.replace(/^##\s+/, "")}</h2>
          );
        }

        if (trimmed.startsWith("# ")) {
          return (
            <h2 key={index}>{trimmed.replace(/^#\s+/, "")}</h2>
          );
        }

        const lines = trimmed.split("\n");
        if (lines.every((line) => /^[-*]\s+/.test(line) || line.trim() === "")) {
          return (
            <ul key={index}>
              {lines
                .filter((line) => line.trim())
                .map((line) => (
                  <li key={line}>{renderInline(line.replace(/^[-*]\s+/, ""))}</li>
                ))}
            </ul>
          );
        }

        if (lines.every((line) => /^\d+\.\s+/.test(line) || line.trim() === "")) {
          return (
            <ol key={index} className="list-decimal space-y-2 pl-5">
              {lines
                .filter((line) => line.trim())
                .map((line) => (
                  <li key={line}>{renderInline(line.replace(/^\d+\.\s+/, ""))}</li>
                ))}
            </ol>
          );
        }

        return <p key={index}>{renderInline(trimmed.replace(/\n/g, " "))}</p>;
      })}
    </div>
  );
}
