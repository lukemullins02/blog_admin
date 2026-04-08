import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#1d3557] p-1.5 border-b-2  border-indigo-500 ">
      <ul className="flex justify-end space-x-4">
        <li>
          <Link
            to="/"
            className="inline-flex items-center justify-center text-white font-bold py-2 px-4 rounded hover:bg-[#24426d]"
          >
            Home
          </Link>
        </li>
        <li>
          <NavLink
            to="/create-post"
            className="inline-flex items-center justify-center text-white font-bold py-2 px-4 rounded hover:bg-[#24426d]"
          >
            Create Post
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/logout"
            className="inline-flex items-center justify-center text-white font-bold py-2 px-4 rounded hover:bg-[#24426d]"
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
