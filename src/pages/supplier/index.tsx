import { Card, Table } from "flowbite-react";
import { type FC } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../../components/button";
import { InfoScreen } from "../../components/infoScreen";
import TabelComponent from "../../components/tabel";
import { useSupplier } from "../../hooks/supplier";
import { getQuery, renderDateTime } from "../../utils/helper";
import { ActionMenu } from "./menus";
import { ModalAddSupplier } from "./modal";

const header = [
  "nip",
  "name",
  "code",
  "address",
  "phone",
  "created",
  "updated",
  "action",
];

const SupplierPage: FC = function () {
  const query: any = getQuery();
  const { data, refetch, error, status } = useSupplier(query);

  return (
    <div>
      <Card className="m-1">
        {/* header */}
        <div className="flex w-full items-center justify-between">
          {/* title */}
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Supplier
          </h1>
          <ModalAddSupplier refetch={refetch}>
            <Button
              className=" bg-blue-500 text-white hover:bg-blue-600"
              leftIcon={<FaPlus />}
            >
              Add New
            </Button>
          </ModalAddSupplier>
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
                  <td className="p-2">{v.id}</td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.supplierName}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.supplierCode}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.address}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.phone}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {renderDateTime(v.createdAt)}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {renderDateTime(v.updatedAt)}
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

export default SupplierPage;
