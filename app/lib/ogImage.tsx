// Shared JSX used by both app/opengraph-image.tsx and app/twitter-image.tsx
// (next/og's ImageResponse just needs a React element — this is the one
// place that markup is defined so the two routes can't drift apart).
export function BrandOgCard() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(135deg, #FF6B35 0%, #E55A2B 50%, #D44A1B 100%)',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 140,
          height: 140,
          borderRadius: 9999,
          background: 'white',
          marginBottom: 40,
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, color: '#FF6B35' }}>M</div>
      </div>
      <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, color: 'white', letterSpacing: -1 }}>
        Marksila254
      </div>
      <div style={{ display: 'flex', fontSize: 32, color: 'rgba(255,255,255,0.9)', marginTop: 16 }}>
        Professional Fitness Instructor &amp; Personal Trainer
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 24,
          color: 'rgba(255,255,255,0.75)',
          marginTop: 28,
          padding: '10px 28px',
          border: '2px solid rgba(255,255,255,0.4)',
          borderRadius: 9999,
        }}
      >
        Nairobi, Kenya
      </div>
    </div>
  );
}
