import { Navbar } from "flowbite-react";
import type { FC } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../hooks/auth";
import Button from "./button";
import { AiOutlineUser } from "react-icons/ai";

const ExampleNavbar: FC = function () {
  const { setLogout, user } = useAuth();
  return (
    <Navbar fluid>
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar.Brand href="/">
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                MJS
              </span>
            </Navbar.Brand>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className=" rounded-full bg-gray-700 text-white">
                <AiOutlineUser size={30} />
              </div>
              <div className="text-lg">{user?.name}</div>
            </div>
            |
            <Button
              className=" bg-blue-500 text-white hover:bg-blue-600"
              leftIcon={<FaSignOutAlt />}
              onClick={setLogout}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default ExampleNavbar;
