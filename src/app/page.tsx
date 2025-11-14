import Link from 'next/link';
import styles from './landing.module.css';
import localFont from 'next/font/local';

const SpaceNova = localFont({
  src: "../assets/fonts/AlloyInk.ttf",
  weight: "400",
  style: "normal",
});

export default function Landing() {
  
  const title = "EDUPlay".split("");

  return (
    <div className="min-h-screen flex flex-col relative">

      {/* Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${styles.bgDrift}`}
          style={{ backgroundImage: 'url(/images/welcome-background.jpg)' }} />
        <div className={`absolute inset-0 bg-black/30 ${styles.pulseOverlay}`} />
      </div>

      {/* content */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* header */}
        <header className="text-center py-12 px-4">
          <div className={`${styles.fadeInDown} ${styles.animate}`}>
            
            <div className="flex items-center justify-center mb-4 gap-4 mt-16">
              {/* logo */}
              <img
                src="/images/nakano-logo.png"
                alt="NAKANO Logo"
                className={`w-25 h-25 object-cover ${styles.logoHover}`}
                style={{ minWidth: '3.5rem' }}
              />
              {/* title */}
              <h1 className={`${SpaceNova.className} text-8xl font-bold bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent p-5`}>
                EDUPlay
              </h1>
            </div>

            <h2 className="text-5xl text-white mb-6 font-extrabold italic drop-shadow-lg">
              Interactive Learning System
            </h2>
          </div>

          {/* intro card */}
          <div className={`${styles.fadeInUp} ${styles.animate} ${styles.delay1} max-w-3xl mx-auto mb-4`}>
            <div className={`bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/30 ${styles.breathe} `}>
              <h3 className="text-xl font-extrabold text-white mb-4 drop-shadow-lg">
                Welcome to NAKANO Learning Platform
              </h3>
              {[
                "At NAKANO, we believe in creating meaningful learning experiences that inspire curiosity and foster growth.",
                "Our interactive platform connects teachers, students, and parents in a collaborative educational ecosystem.",
                "Whether you're an educator crafting engaging lessons, a student exploring new concepts, or a parent supporting your child's journey, NAKANO provides the tools and insights you need for success."
              ].map((line, i) => (
                <p
                  key={i}
                  className={`text-black font-semibold leading-relaxed drop-shadow-sm ${styles.fadeLine}`}
                  style={{ animationDelay: `${0.3 + i * 0.2}s` }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </header>

        {/* main */}
        <main className="flex-1 px-4 pb-8">
          <div className="max-w-6xl mx-auto">
            <section className={`${styles.fadeInUp} ${styles.animate} ${styles.delay2} mb-12 items-center flex flex-col`}>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-white mb-2 drop-shadow-lg">
                  Learning Community
                </h3>
                <p className="text-white/80 drop-shadow-sm">
                  Join our vibrant educational ecosystem
                </p>
              </div>

              {/* login card */}
              <Link
                href="/auth/signin"
                className={`${styles.loginCard} ${styles.hoverEffect} ${styles.float} ${styles.loginCardHover} group w-full max-w-md`}
              >
                <div className="p-4 text-center bg-indigo-600 rounded-2xl">
                  <div className="text-3xl font-bold text-white mb-3">Login</div>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Become a part of our interactive community
                    <span className={`arrow ${styles.arrow}`}>→</span>
                  </p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white/80 text-sm">Click to get started</span>
                  </div>
                </div>
              </Link>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className={`${styles.fadeInUp} ${styles.animate} ${styles.delay4} bg-black/50 backdrop-blur-md text-white py-8 px-4`}>
          <div className="max-w-6xl mx-auto text-center">
            <div className={`${styles.slideUp} mb-4`} style={{ animationDelay: '0.2s' }}>
              <h4 className="text-xl font-semibold mb-2">
                <a href="#" className={styles.footerLink}>NAKANO Learning Platform</a>
              </h4>
              <p className="text-white/70 text-sm">
                Empowering education through interactive technology
              </p>
            </div>
            <div className="border-t border-white/20 pt-4">
              <p className={`${styles.slideUp} text-white/60 text-sm`} style={{ animationDelay: '0.4s' }}>
                © 2024 <a href="#" className={styles.footerLink}>NAKANO Interactive Learning Software</a>. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
