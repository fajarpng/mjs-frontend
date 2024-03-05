import { Button, Card, Dropdown, Table, TextInput } from "flowbite-react";
import type { FC } from "react";
import { FaList } from "react-icons/fa";
import TabelComponent from "../../components/tabel";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useQuery } from "react-query";
import fetchEmployees from "../../api/user";
import { InfoScreen } from "../../components/infoScreen";
import { ModalAddEmployee } from "./modal";

const header = ["nip", "name", "email", "phone", "birth", "join", "action"];

const EmployeePage: FC = function () {
  const { data, refetch, error, status } = useQuery(["employee", {}], () =>
    fetchEmployees({})
  );

  return (
    <NavbarSidebarLayout isFooter={false}>
      <Card className="m-1">
        {/* header */}
        <div className="mb-1 w-full">
          {/* title */}
          <h1 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Employee
          </h1>
          {/* filter */}
          <div className="flex justify-between">
            <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput name="users-search" placeholder="Search product" />
                </div>
              </form>
            </div>
            <ModalAddEmployee>
              <Button>Add</Button>
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
                    {v.birthDate}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.joinDate}
                  </td>
                  <td className="w-4 p-2">
                    <ActionMenu />
                  </td>
                </Table.Row>
              ))}
            </Table.Body>
          </TabelComponent>
        </InfoScreen>
      </Card>
    </NavbarSidebarLayout>
  );
};

const ActionMenu = () => {
  return (
    <Dropdown label={<FaList />} arrowIcon={false}>
      <Dropdown.Item>See Detail</Dropdown.Item>
      <Dropdown.Item>Edit</Dropdown.Item>
      <Dropdown.Item>Delete</Dropdown.Item>
    </Dropdown>
  );
};

export default EmployeePage;
