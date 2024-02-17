import { Button, Navbar } from "flowbite-react";
import type { FC } from "react";
import { useAuth } from "../hooks/auth";

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
            <div className="text-lg">{user?.name}</div>
            <Button onClick={setLogout}>Sign Out</Button>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default ExampleNavbar;
