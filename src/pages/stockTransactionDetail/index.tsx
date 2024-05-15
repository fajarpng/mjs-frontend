import { Card, Table } from "flowbite-react";
import { type FC } from "react";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router";
import Button from "../../components/button";
import { InfoScreen } from "../../components/infoScreen";
import TabelComponent from "../../components/tabel";
import { useDetailStock, useStockData } from "../../hooks/stockTransaction";
import { ActionMenu } from "./menus";
import { ModalAddStock } from "./modal";

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
  } = useStockData(stock?.number);

  const refetch = () => {
    refetchData();
    refetchStock();
  };

  return (
    <div>
      <Card className="m-1">
        {/* header */}
        <div className="flex w-full items-center justify-between">
          {/* title */}
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Detail Transaction
          </h1>
          <ModalAddStock refetch={refetchData} stock={stock}>
            <Button
              className=" bg-blue-500 text-white hover:bg-blue-600"
              leftIcon={<FaPlus />}
            >
              Add New
            </Button>
          </ModalAddStock>
        </div>
      </Card>
      {/* tabel */}

      {/* render data */}
      <Card className="m-1">
        <InfoScreen
          status={status}
          reload={refetch}
          dataLength={data?.length}
          error={error}
        >
          <TabelComponent header={header}>
            <Table.Body>
              {data?.map((v, i) => (
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
