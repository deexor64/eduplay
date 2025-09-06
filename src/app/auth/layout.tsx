import Link from 'next/link';

export default function Layout(props: any) {

  return (
    <div className="h-screen overflow-hidden flex items-center justify-end bg-gray-600 p-8 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/login.jpg')" }}>
      {props.children}
    </div>
  );

};
