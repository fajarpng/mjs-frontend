import { Navbar } from "flowbite-react";
import type { FC } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useAuth } from "../hooks/auth";

const ExampleNavbar: FC = function () {
  const { user } = useAuth();
  return (
    <Navbar fluid>
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar.Brand href="/">
              <img
                src="/images/logo-blue.png"
                alt="kizoku logo"
                className="w-40 object-contain dark:hidden"
              />
              <img
                src="/images/logo-white.png"
                alt="kizoku logo"
                className="hidden w-40 object-contain dark:block"
              />
            </Navbar.Brand>
          </div>
          {/*  */}
          <div className="flex items-center gap-2">
            <div className="text-lg dark:text-white">{user?.name}</div>
            <div className=" rounded-full bg-gray-700 text-white dark:bg-gray-700 dark:text-gray-100">
              <AiOutlineUser size={30} />
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default ExampleNavbar;
