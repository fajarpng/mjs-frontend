import { Card, Table } from "flowbite-react";
import { type FC } from "react";
import { FaPlus, FaPrint, FaTrash } from "react-icons/fa";
import { useParams } from "react-router";
import Button from "../../components/button";
import { InfoScreen } from "../../components/infoScreen";
import TabelComponent from "../../components/tabel";
import { useDetailStock, useStockData } from "../../hooks/stockTransaction";
import { ActionMenu } from "./menus";
import { ModalAddStock } from "./modal";
import { renderDate } from "../../utils/helper";

const header = [
  "id",
  "number transaction",
  "product code",
  "quantity",
  "action",
];

const DetailStockTransactionPage: FC = function () {
  const query: any = useParams();
  const { data: stock, refetch: refetchStock } = useDetailStock(query.id);
  const {
    data,
    refetch: refetchData,
    error,
    status,
  } = useStockData({
    stockNumber: stock?.number,
    query: {
      pageIndex: 1,
      pageSize: 10,
      ...query,
    },
  });

  const refetch = () => {
    refetchData();
    refetchStock();
  };

  return (
    <div>
      <Card className="m-1">
        {/* header */}
        <div className="w-full">
          {/* title */}
          {stock && (
            <div className="mb-4 grid grid-cols-4 gap-4 text-center dark:text-white">
              <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-700">
                <p className="mb-2 font-bold">Transaction Number</p>
                {stock.number}
              </div>
              <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-700">
                <p className="mb-2 font-bold">Type</p>
                {stock.type}
              </div>
              <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-700">
                <p className="mb-2 font-bold">Date</p>
                {renderDate(stock.createdAt)}
              </div>

              <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-700">
                <p className="mb-2 font-bold">Status</p>
                {/* {stock.status} */}
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <ModalAddStock refetch={refetchData} stock={stock}>
              <Button
                className=" bg-blue-500 text-white hover:bg-blue-600"
                leftIcon={<FaPlus />}
              >
                Add Product
              </Button>
            </ModalAddStock>
            <Button
              className=" bg-red-500 text-white hover:bg-red-600"
              leftIcon={<FaTrash />}
            >
              Delete
            </Button>
            <Button
              className=" bg-yellow-500 text-white hover:bg-yellow-600"
              leftIcon={<FaPrint />}
            >
              Print
            </Button>
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
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.id}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.numberTrans}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.productCode}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.qty}
                  </td>
                  <td className="w-[50px]">
                    <ActionMenu data={v} refetch={refetchData} />
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

export default DetailStockTransactionPage;
