import { Card, Table, TextInput } from "flowbite-react";
import { type FC } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../../components/button";
import { InfoScreen } from "../../components/infoScreen";
import TabelComponent from "../../components/tabel";
import { useProduct } from "../../hooks/product";
import { getQuery } from "../../utils/helper";
import { ActionMenu } from "./menus";
import { ModalAddProduct } from "./modal";

const header = [
  "image",
  "name",
  "category",
  "quantity",
  "quantity min",
  "action",
];

const MasterProductPage: FC = function () {
  const query: any = getQuery();
  const { data, refetch, error, status } = useProduct({
    pageIndex: 1,
    pageSize: 10,
    ...query,
  });

  return (
    <div>
      <Card className="m-1">
        {/* header */}
        <div className="mb-1 w-full">
          {/* title */}
          <h1 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Product
          </h1>
          {/* filter */}
          <div className="flex justify-between">
            <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput
                    name="search"
                    defaultValue={query.search}
                    onSubmit={(e) => e.preventDefault()}
                    placeholder="search..."
                  />
                </div>
              </form>
            </div>
            <ModalAddProduct refetch={refetch}>
              <Button
                className=" bg-blue-500 text-white hover:bg-blue-600"
                leftIcon={<FaPlus />}
              >
                Add New
              </Button>
            </ModalAddProduct>
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
                  <td className="w-32 p-2">
                    <img
                      src={v.imageUrl || "/images/empty.png"}
                      alt={v.productCode}
                      className="w-full"
                    />
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.productCode} - {v.productName}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.categoryCode} - {v.categoryName}
                  </td>
                  <td className="w-32 whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.qty}
                  </td>
                  <td className="w-32 whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.qtyMin}
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

export default MasterProductPage;
