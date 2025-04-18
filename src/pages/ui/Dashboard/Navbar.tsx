function Navbar(props: any) {
  return (
    <nav className="navbar">
      <h1 className="logo">NAKANO</h1>
      <div className="user-info">
        <span>Username</span>
        <img src="profile.jpg" alt="Profile" className="profile-image" />
        <button className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
