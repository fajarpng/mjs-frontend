import type { FC } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

const PageNotFound: FC = function () {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
        Page Not Found | 404
      </span>
      <button
        onClick={() => navigate(-1)}
        className=" flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-700"
      >
        <FaArrowLeft /> Go Back
      </button>
    </div>
  );
};

export default PageNotFound;
