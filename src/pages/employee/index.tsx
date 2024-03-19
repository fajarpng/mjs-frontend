import { Card, Table } from "flowbite-react";
import { type FC } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../../components/button";
import { InfoScreen } from "../../components/infoScreen";
import TabelComponent from "../../components/tabel";
import { useEmployee } from "../../hooks/employee";
import { getQuery, renderDate } from "../../utils/helper";
import EmployeePageFilter from "./filter";
import ActionMenu from "./menus";
import { ModalAddEmployee } from "./modal";

const header = [
  "nip",
  "nik",
  "name",
  "email",
  "phone",
  "birth",
  "join",
  "action",
];

const EmployeePage: FC = function () {
  const query: any = getQuery();
  const { data, refetch, error, status } = useEmployee(query);

  return (
    <div>
      <Card className="m-1">
        {/* header */}
        <div className="mb-1 w-full">
          {/* title */}
          <h1 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Employee
          </h1>
          <div className="flex justify-between">
            {/* filter */}
            <div className="mb-3 hidden w-full items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <EmployeePageFilter />
            </div>
            <ModalAddEmployee refetch={refetch}>
              <Button
                className=" bg-blue-500 text-white hover:bg-blue-600"
                leftIcon={<FaPlus />}
              >
                Add
              </Button>
            </ModalAddEmployee>
          </div>
        </div>
      </Card>
      {/* tabel */}

      {/* render data */}
      <Card className="m-1">
        <InfoScreen
          status={status}
          reload={refetch}
          dataLength={data?.data.length}
          error={error}
        >
          <TabelComponent header={header} pagination={data?.meta}>
            <Table.Body>
              {data?.data.map((v, i) => (
                <Table.Row
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  key={i}
                >
                  <td className="p-2">{v.nip}</td>
                  <td className="p-2">{v.nik}</td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.name}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.email}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.phone}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {renderDate(v.birthDate)}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {renderDate(v.joinDate)}
                  </td>
                  <td className="w-[50px]">
                    <ActionMenu data={v} refetch={refetch} />
                  </td>
                </Table.Row>
              ))}
            </Table.Body>
          </TabelComponent>
        </InfoScreen>
      </Card>
    </div>
  );
};

export default EmployeePage;
