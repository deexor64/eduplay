import Link from 'next/link';
import styles from './welcome.module.css';
import { UserType } from '@/lib/utils/types';

export default function Root() {
  
  const users: UserType[] = ["ADMIN", "TEACHER", "STUDENT", "PARENT"];

  function getDisplayText(role: string): string {
    return role.charAt(0).toUpperCase() + role.slice(1) + " Login";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">NAKANO</h1>
      <h2 className="text-2xl text-gray-600 mb-8">Interactive Learning Software</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md w-full">
        {
          users.map(function (role, index) {
            return (
              <Link href={"signup?userType=" + role} className={`${styles.loginCard} hover:scale-105`} key={index}>
                <div className="p-6 text-center text-lg font-semibold text-gray-700">
                  {getDisplayText(role)}
                </div>
              </Link>
            );
          })
        }
      </div>
    </div>
  );
}
