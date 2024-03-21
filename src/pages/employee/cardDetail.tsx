import type { TEmployee } from "../../types";
import { renderDate } from "../../utils/helper";

export const CardDetailEmployee = ({ data }: { data: TEmployee }) => {
  return (
    <div className="grid gap-4 dark:text-white">
      {/* personal info */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className=" mb-4 border-b border-gray-200 pb-2 dark:border-gray-700">
          Personal Information
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <div className="mb-1 text-sm text-gray-500">Full Name</div>
            <div>{data.name}</div>
          </div>
          <div>
            <div className="mb-1 text-sm text-gray-500"> NIP</div>
            <div>{data.nip}</div>
          </div>
          <div>
            <div className="mb-1 text-sm text-gray-500"> NIK</div>
            <div>{data.nik}</div>
          </div>
          <div>
            <div className="mb-1 text-sm text-gray-500"> Birth Date</div>
            <div>{renderDate(data.birthDate)}</div>
          </div>
          <div>
            <div className="mb-1 text-sm text-gray-500"> Join Date</div>
            <div>{renderDate(data.joinDate)}</div>
          </div>
          <div>
            <div className="mb-1 text-sm text-gray-500"> Religion</div>
            <div>{data.religion}</div>
          </div>
          <div>
            <div className="mb-1 text-sm text-gray-500"> Role</div>
            <div>{data.role}</div>
          </div>
        </div>
      </div>
      {/* contact info */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className=" mb-4 border-b border-gray-200 pb-2 dark:border-gray-700">
          Contact Information
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-1 text-sm text-gray-500">Email</div>
            <div>{data.email}</div>
          </div>
          <div>
            <div className="mb-1 text-sm text-gray-500">Phone</div>
            <div>{data.phone}</div>
          </div>
          <div className="col-span-2">
            <div className="mb-1 text-sm text-gray-500">Address</div>
            <div>{data.address}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
