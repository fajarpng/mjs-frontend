import { Card, Table } from "flowbite-react";
import { type FC } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../../components/button";
import { InfoScreen } from "../../components/infoScreen";
import TabelComponent from "../../components/tabel";
import { useCategory } from "../../hooks/category";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ActionMenu from "./menus";
import { ModalAddCategory } from "./modal";

const header = ["id", "category name", "category code", "action"];

const CategoryPage: FC = function () {
  const { data, refetch, error, status } = useCategory();

  return (
    <NavbarSidebarLayout isFooter={false}>
      <Card className="m-1">
        {/* header */}
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Category
          </h1>
          {/* button add */}
          <ModalAddCategory>
            <Button
              className=" bg-blue-500 text-white hover:bg-blue-600"
              leftIcon={<FaPlus />}
            >
              Add
            </Button>
          </ModalAddCategory>
        </div>
      </Card>

      {/* render data */}
      <Card className="m-1">
        <InfoScreen
          status={status}
          reload={refetch}
          dataLength={data?.data.length}
          error={error}
        >
          {/* tabel */}
          <TabelComponent header={header} pagination={data?.meta}>
            <Table.Body>
              {data?.data.map((v, i) => (
                <Table.Row
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  key={i}
                >
                  <td className="p-2">{v.id}</td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.categoryCode}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.categoryName}
                  </td>
                  <td className="w-[50px]">
                    <ActionMenu data={v} />
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

export default CategoryPage;
