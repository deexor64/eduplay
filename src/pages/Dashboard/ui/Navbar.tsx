type NavbarProps = {
  userName: string;
  profileImage: string;
};

const Navbar = ({ userName, profileImage }: NavbarProps) => {
  return (
    <nav className="flex justify-between items-center bg-blue-600 text-white px-6 py-3 shadow">
      <h1 className="text-xl font-bold">NAKANO</h1>
      <div className="flex items-center gap-4">
        <span>{userName}</span>
        <img 
          src={profileImage} 
          alt="Profile" 
          className="rounded-full w-10 h-10"
        />
        <button className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
