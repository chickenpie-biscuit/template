import { Stack, Text, TextArea } from '@sanity/ui';
import { useState, useCallback } from 'react';
import { StringInputProps, set, unset } from 'sanity';

export function MetaDescriptionInput(props: StringInputProps) {
  const { value = '', onChange } = props;
  const [charCount, setCharCount] = useState(value?.length || 0);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.currentTarget.value;
    setCharCount(newValue.length);
    onChange(newValue ? set(newValue) : unset());
  }, [onChange]);

  // Determine color based on length
  let countColor = 'default';
  if (charCount < 120) {
    countColor = 'caution'; // Yellow
  } else if (charCount >= 120 && charCount <= 160) {
    countColor = 'positive'; // Green
  } else if (charCount > 160) {
    countColor = 'critical'; // Red
  }

  return (
    <Stack space={2}>
      <TextArea
        value={value}
        onChange={handleChange}
        rows={4}
        placeholder="Enter a compelling description for search engines..."
      />
      <Text size={1} muted>
        <span style={{
          color: countColor === 'positive' ? '#43d675' :
                 countColor === 'caution' ? '#f59e0b' :
                 countColor === 'critical' ? '#ef4444' :
                 'inherit',
          fontWeight: 600
        }}>
          {charCount} characters
        </span>
        {' '}
        {charCount < 120 && '(Too short - aim for 120-160)'}
        {charCount >= 120 && charCount <= 160 && '(Perfect length! ✓)'}
        {charCount > 160 && '(Too long - may be truncated)'}
      </Text>
      {value && (
        <div style={{
          padding: '12px',
          background: '#f3f4f6',
          borderRadius: '4px',
          fontSize: '13px',
          lineHeight: '1.5',
        }}>
          <Text size={1} weight="semibold" style={{ display: 'block', marginBottom: '4px' }}>
            Preview in Search Results:
          </Text>
          <Text size={1} style={{ color: '#1a0dab', fontWeight: 500 }}>
            {props.schemaType?.title || 'Page Title'} | Chickenpie
          </Text>
          <Text size={1} style={{ color: '#4d5156', display: 'block', marginTop: '2px' }}>
            {value.slice(0, 160)}{value.length > 160 ? '...' : ''}
          </Text>
        </div>
      )}
    </Stack>
  );
}
