import Link from 'next/link';
import styles from './welcome.module.css';
import { UserType } from '@/lib/utils/types';

export default function Root() {
  const teacherStudentUsers: UserType[] = ["TEACHER", "STUDENT"];
  const parentUsers: UserType[] = ["PARENT"];

  function getDisplayText(role: string): string {
    return role.charAt(0).toUpperCase() + role.slice(1) + " Login";
  }

  function getRoleDescription(role: string): string {
    switch (role) {
      case "TEACHER":
        return "Create engaging activities and manage your classroom";
      case "STUDENT":
        return "Access interactive learning materials and track progress";
      case "PARENT":
        return "Monitor your child's learning journey and achievements";
      default:
        return "";
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Fixed Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/welcome-background.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="text-center py-12 px-4">
          <div className={`${styles.fadeInDown} ${styles.animate}`}>
            <div className="flex items-center justify-center mb-4 gap-4">
              <img 
                src="/images/nakano-logo.png" 
                alt="NAKANO Logo" 
                className="w-25 h-25 object-cover"
                style={{ minWidth: '3.5rem' }}
              />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NAKANO
              </h1>
            </div>
            <h2 className="text-2xl text-white mb-6 font-medium drop-shadow-lg">
              Interactive Learning System
            </h2>
          </div>
          
          {/* School Introduction */}
          <div className={`${styles.fadeInUp} ${styles.animate} ${styles.delay1} max-w-3xl mx-auto mb-4`}>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/30">
              <h3 className="text-xl font-semibold text-white mb-4 drop-shadow-lg">Welcome to NAKANO Learning Platform</h3>
              <p className="text-white/90 leading-relaxed drop-shadow-sm">
                At NAKANO, we believe in creating meaningful learning experiences that inspire curiosity and foster growth. 
                Our interactive platform connects teachers, students, and parents in a collaborative educational ecosystem. 
                Whether you're an educator crafting engaging lessons, a student exploring new concepts, or a parent supporting 
                your child's journey, NAKANO provides the tools and insights you need for success.
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 pb-8">
          <div className="max-w-6xl mx-auto">
            {/* Teachers & Students Section */}
            <section className={`${styles.fadeInUp} ${styles.animate} ${styles.delay2} mb-12`}>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-white mb-2 drop-shadow-lg">Learning Community</h3>
                <p className="text-white/80 drop-shadow-sm">Join our vibrant educational ecosystem</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {teacherStudentUsers.map(function (role, index) {
                  return (
                    <Link 
                      href={"signup?userType=" + role} 
                      className={`${styles.loginCard} ${styles.hoverEffect} group`} 
                      key={index}
                    >
                      <div className="p-8 text-center">
                        <div className="text-2xl font-bold text-white mb-3">
                          {getDisplayText(role)}
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed">
                          {getRoleDescription(role)}
                        </p>
                        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-white/80 text-sm">Click to get started →</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Parents Section */}
            <section className={`${styles.fadeInUp} ${styles.animate} ${styles.delay3}`}>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-white mb-2 drop-shadow-lg">Family Connection</h3>
                <p className="text-white/80 drop-shadow-sm">Stay connected with your child's learning journey</p>
              </div>
              
              <div className="max-w-lg mx-auto">
                {parentUsers.map(function (role, index) {
                  return (
                    <Link 
                      href={"signup?userType=" + role} 
                      className={`${styles.parentCard} ${styles.hoverEffect} group`} 
                      key={index}
                    >
                      <div className="p-8 text-center">
                        <div className="text-2xl font-bold text-white mb-3">
                          {getDisplayText(role)}
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed">
                          {getRoleDescription(role)}
                        </p>
                        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-white/80 text-sm">Click to get started →</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className={`${styles.fadeInUp} ${styles.animate} ${styles.delay4} bg-black/50 backdrop-blur-md text-white py-8 px-4`}>
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-4">
              <h4 className="text-xl font-semibold mb-2">NAKANO Learning Platform</h4>
              <p className="text-white/70 text-sm">
                Empowering education through interactive technology
              </p>
            </div>
            <div className="border-t border-white/20 pt-4">
              <p className="text-white/60 text-sm">
                © 2024 NAKANO Interactive Learning Software. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
