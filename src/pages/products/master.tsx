import { Card, Dropdown, Table, TextInput } from "flowbite-react";
import type { FC } from "react";
import { FaList } from "react-icons/fa";
import TabelComponent from "../../components/tabel";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";

const MasterBarangPage: FC = function () {
  const header = ["nip", "name", "code", "quantity", "description", "action"];

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        {/* header */}
        <div className="mb-1 w-full">
          {/* title */}
          <h1 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Products
          </h1>
          {/* filter */}
          <div className="sm:flex">
            <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput
                    id="users-search"
                    name="users-search"
                    placeholder="Search product"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* tabel */}
      <Card className=" m-2">
        <TabelComponent header={header} pagination={dummy}>
          <Table.Body>
            {dummy.products.map((v, i) => (
              <Table.Row
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                key={i}
              >
                <Table.Cell className="w-4 p-2">{v.id}</Table.Cell>
                <Table.Cell className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                  {v.productName}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                  {v.productCode}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                  {v.qty}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                  {v.description}
                </Table.Cell>
                <Table.Cell className="w-4">
                  <ActionMenu />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </TabelComponent>
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

export default MasterBarangPage;

// eslint-disable-next-line no-unused-vars
const dummy = {
  pageIndex: 3,
  pageSize: 1,
  pageCount: 10,
  totalCount: 10,
  products: [
    {
      id: 1,
      productCode: "A123",
      productName: "Test 123 123",
      barcode: "121233",
      description: "dasdasda",
      qty: 10,
      qtyMin: 1,
      type: 1,
      createdAt: "2024-02-07T01:41:04",
      updatedAt: null,
      isDeleted: false,
      deletedAt: null,
    },
    {
      id: 2,
      productCode: "ABC",
      productName: "Batre",
      barcode: "ABC45679",
      description: "DESKRIPSI",
      qty: 2,
      qtyMin: 10,
      type: 1,
      createdAt: "2024-02-06T19:19:15",
      updatedAt: null,
      isDeleted: false,
      deletedAt: null,
    },
    {
      id: 3,
      productCode: "string",
      productName: "string",
      barcode: "string",
      description: "-",
      qty: 0,
      qtyMin: 0,
      type: 2,
      createdAt: "2024-02-07T02:54:26",
      updatedAt: null,
      isDeleted: false,
      deletedAt: null,
    },
  ],
};