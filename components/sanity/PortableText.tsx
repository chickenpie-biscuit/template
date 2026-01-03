import { PortableText as PortableTextComponent } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';

interface PortableTextProps {
  content: PortableTextBlock[];
}

export default function PortableText({ content }: PortableTextProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <PortableTextComponent value={content} />
    </div>
  );
}

