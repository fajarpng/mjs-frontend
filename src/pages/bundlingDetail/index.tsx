import { Card, Table } from "flowbite-react";
import { type FC } from "react";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router";
import Button from "../../components/button";
import { InfoScreen } from "../../components/infoScreen";
import TabelComponent from "../../components/tabel";
import { useDetailBundling } from "../../hooks/bundling";
import { ActionMenu } from "./menus";
import { ModalAddBundling } from "./modal";

const header = ["id", "bundling code", "component code", "qunatity", "action"];

const BundlingDetailPage: FC = function () {
  const query: any = useParams();
  const { data, refetch, error, status } = useDetailBundling(query?.code);

  return (
    <div>
      <Card className="m-1">
        {/* header */}
        <div className="flex w-full items-center justify-between">
          {/* title */}
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Detail Bundling
          </h1>
          <ModalAddBundling refetch={refetch}>
            <Button
              className=" bg-blue-500 text-white hover:bg-blue-600"
              leftIcon={<FaPlus />}
            >
              Add New
            </Button>
          </ModalAddBundling>
        </div>
      </Card>

      <div className="m-1 flex w-full items-center gap-1">
        <Card className="text-center">
          <p className="font-semibold text-gray-900 dark:text-white">
            Bundel Code
          </p>
          {query?.code}
        </Card>
        <Card className="text-center">
          <p className="font-semibold text-gray-900 dark:text-white">
            Quantity
          </p>
          {data?.qty ?? 0}
        </Card>
      </div>

      {/* render data */}
      <Card className="m-1">
        <InfoScreen
          status={status}
          reload={refetch}
          dataLength={data?.details.length}
          error={error}
        >
          {/* tabel */}
          <TabelComponent header={header}>
            <Table.Body>
              {data?.details.map((v, i) => (
                <Table.Row
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  key={i}
                >
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.id}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.bundlingCode}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.componentCode}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.qty}
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

export default BundlingDetailPage;
