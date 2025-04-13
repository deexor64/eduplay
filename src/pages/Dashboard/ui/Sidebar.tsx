type SidebarProps = {
  links: string[];
};

const Sidebar = ({ links }: SidebarProps) => {
  return (
    <aside className="w-48 bg-gray-200 h-full p-4 space-y-4 shadow-inner">
      {links.map((link) => (
        <a key={link} href="#" className="block hover:text-blue-600">{link}</a>
      ))}
    </aside>
  );
};

export default Sidebar;
