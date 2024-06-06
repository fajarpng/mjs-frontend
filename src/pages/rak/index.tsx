import { Card, Table } from "flowbite-react";
import { type FC } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../../components/button";
import { InfoScreen } from "../../components/infoScreen";
import TabelComponent from "../../components/tabel";
import { useRak } from "../../hooks/rak";
import ActionMenu from "./menus";
import { ModalAddRak } from "./modal";
import { getQuery } from "../../utils/helper";

const header = ["id", "rak name", "rak code", "description", "action"];

const RakPage: FC = function () {
  const query: any = getQuery();
  const { data, refetch, error, status } = useRak({
    pageIndex: 1,
    pageSize: 10,
    ...query,
  });

  return (
    <div>
      <Card className="m-1">
        {/* header */}
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Rak
          </h1>
          {/* button add */}
          <ModalAddRak refetch={refetch}>
            <Button
              className=" bg-blue-500 text-white hover:bg-blue-600"
              leftIcon={<FaPlus />}
            >
              Add New
            </Button>
          </ModalAddRak>
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
                  <td className="w-4 p-2">{v.id}</td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.rakName}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.rakCode}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.description}
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

export default RakPage;
