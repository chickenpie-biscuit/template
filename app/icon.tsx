import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: '#F4A261', // Brand goldenrod
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black',
          borderRadius: '50%', // Circle shape
          fontWeight: 800,
          fontFamily: 'monospace',
        }}
      >
        C
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
