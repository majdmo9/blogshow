import Link from "next/link";
import AuthLinks from "./AuthLinks";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-[100px]">
      <div className="flex-1 logo">
        <h1 className="text-3xl font-bold tracking-widest">BlogShow</h1>
      </div>
      <div className="flex justify-end items-center gap-4 flex-1 text-xl links">
        <ThemeToggle />
        <Link href="/" className="link">
          Homepage
        </Link>
        <Link href="/dashboard/contact" className="link">
          Contact
        </Link>
        <Link href="/dashboard/about" className="link">
          About
        </Link>
        <AuthLinks />
      </div>
    </nav>
  );
};

export default Navbar;
