import { Card, Table, TextInput } from "flowbite-react";
import { type FC } from "react";
import { FaEye, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import Button from "../../components/button";
import { InfoScreen } from "../../components/infoScreen";
import TabelComponent from "../../components/tabel";
import { useProduct } from "../../hooks/product";
import { getQuery, renderDateTime } from "../../utils/helper";
import { ModalAddProduct } from "./modal";

const header = ["nip", "name", "code", "created", "updated", "action"];

const StockTransactionPage: FC = function () {
  const query: any = getQuery();
  const { data, refetch, error, status } = useProduct(query);

  return (
    <div>
      <Card className="m-1">
        {/* header */}
        <div className="mb-1 w-full">
          {/* title */}
          <h1 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Stock Transaction
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
            <ModalAddProduct>
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
                  <td className="p-2">{v.productId}</td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.productName}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.productCode}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.createdBy}
                    {renderDateTime(v.createdAt)}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.updatedBy}
                    {renderDateTime(v.updatedAt)}
                  </td>
                  <td className="w-[50px]">
                    <ActionMenu />
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

const ActionMenu = () => {
  return (
    <div className=" flex justify-end gap-1 p-2">
      <Button className=" border-2 border-blue-500 text-blue-500 hover:bg-primary-500 hover:text-white">
        <FaEye />
      </Button>
      <Button className=" border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
        <FaPen />
      </Button>
      <Button className=" border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
        <FaTrash />
      </Button>
    </div>
  );
};

export default StockTransactionPage;
