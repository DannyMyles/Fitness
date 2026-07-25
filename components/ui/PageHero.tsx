import { LucideIcon } from 'lucide-react';

interface PageHeroProps {
  badge?: string;
  badgeIcon?: LucideIcon;
  title: string;
  subtitle: string;
}

// Shared, compact hero panel used across About/Services/Gallery/Contact/Events —
// consistent with the Home/Shop bento hero treatment, avoids each page rolling
// its own full-bleed dark photo banner (which was inconsistent and hard to
// read against varied source photos).
export default function PageHero({ badge, badgeIcon: Icon, title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-gray-50 pt-8 pb-4 md:pt-12">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-fitness-primary via-fitness-primary to-fitness-primary-dark px-6 py-16 md:px-16 md:py-20 text-center shadow-fitness-lg ring-1 ring-white/10">
          {/* Spotlight + texture layers */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.18),transparent_45%)]" />
          <div className="absolute inset-0 opacity-[0.15] bg-pattern-dots" />

          {/* Decorative blurred orbs */}
          <div className="absolute -top-16 -left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-16 w-80 h-80 bg-fitness-primary-dark/40 rounded-full blur-3xl" />

          {/* Oversized watermark icon */}
          {Icon && (
            <Icon
              size={260}
              strokeWidth={1}
              className="absolute -right-8 -bottom-10 text-white/10 rotate-12 pointer-events-none hidden md:block"
            />
          )}

          <div className="relative z-10 max-w-2xl mx-auto">
            {badge && (
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-semibold text-white mb-6 shadow-sm">
                {Icon && (
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <Icon size={12} />
                  </span>
                )}
                {badge}
              </div>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-4 drop-shadow-sm">
              {title}
            </h1>
            <div className="w-14 h-1 bg-white/40 rounded-full mx-auto mb-5" />
            <p className="text-lg text-white/85 leading-relaxed">{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
