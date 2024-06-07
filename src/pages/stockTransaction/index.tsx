import { Card, Table } from "flowbite-react";
import { type FC } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../../components/button";
import { InfoScreen } from "../../components/infoScreen";
import TabelComponent from "../../components/tabel";
import { useStock } from "../../hooks/stockTransaction";
import { getQuery } from "../../utils/helper";
import { ActionMenu } from "./menus";
import { ModalAddStock } from "./modal";

const header = ["id", "type", "supplier", "notes", "action"];

const StockTransactionPage: FC = function () {
  const query: any = getQuery();
  const { data, refetch, error, status } = useStock({
    pageIndex: 1,
    pageSize: 50,
    ...query,
  });

  return (
    <div>
      <Card className="m-1">
        {/* header */}
        <div className="flex w-full items-center justify-between">
          {/* title */}
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Stock Transaction
          </h1>
          <ModalAddStock refetch={refetch}>
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
                    {v.number}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.type}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.supplierCode}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.notes}
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

export default StockTransactionPage;
