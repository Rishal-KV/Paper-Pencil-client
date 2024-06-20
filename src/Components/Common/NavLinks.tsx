import { useNavigate } from "react-router-dom";

function NavLinks({ link, path }: { link: string; path: string }) {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <h1
        onClick={() => navigate(path)}
        className="hover:cursor-pointer mr-10 text-lg font-Poppins text-black"
      >
        {link}
      </h1>
    </div>
  );
}

export default NavLinks;
