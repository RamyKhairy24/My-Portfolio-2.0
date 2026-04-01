import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Ramy Khairy | Backend Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
          fontFamily: 'serif',
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245,242,237,0.04) 0%, transparent 100%)',
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: 'rgba(245,242,237,0.15)',
            display: 'flex',
          }}
        />

        {/* Overline label */}
        <div
          style={{
            fontSize: 12,
            letterSpacing: '0.4em',
            color: 'rgba(245,242,237,0.3)',
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
            marginBottom: 32,
            display: 'flex',
          }}
        >
          Portfolio
        </div>

        {/* RK monogram */}
        <div
          style={{
            fontSize: 130,
            fontStyle: 'italic',
            color: '#f5f2ed',
            letterSpacing: '-0.04em',
            lineHeight: 0.85,
            marginBottom: 44,
            display: 'flex',
            opacity: 0.92,
          }}
        >
          RK
        </div>

        {/* Separator */}
        <div
          style={{
            width: 64,
            height: 1,
            background: 'rgba(245,242,237,0.18)',
            marginBottom: 36,
            display: 'flex',
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 40,
            color: '#f5f2ed',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: 18,
            fontFamily: 'sans-serif',
            fontWeight: 300,
            display: 'flex',
          }}
        >
          RAMY KHAIRY
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: 15,
            color: 'rgba(245,242,237,0.4)',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
            marginBottom: 52,
            display: 'flex',
          }}
        >
          Backend Developer
        </div>

        {/* Stack pill */}
        <div
          style={{
            fontSize: 12,
            color: 'rgba(245,242,237,0.25)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
            borderTop: '1px solid rgba(245,242,237,0.08)',
            paddingTop: 24,
            display: 'flex',
          }}
        >
          ASP.NET Core · Clean Architecture · NestJS · PostgreSQL
        </div>

        {/* Bottom corner label */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 60,
            fontSize: 11,
            color: 'rgba(245,242,237,0.15)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
            display: 'flex',
          }}
        >
          Alexandria · Egypt
        </div>
      </div>
    ),
    { ...size }
  );
}
