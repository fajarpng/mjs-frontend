import { Card, Table } from "flowbite-react";
import { type FC } from "react";
import { FaEye, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import Button from "../../components/button";
import { InfoScreen } from "../../components/infoScreen";
import TabelComponent from "../../components/tabel";
import { useSupplier } from "../../hooks/supplier";
import { getQuery, renderDateTime } from "../../utils/helper";
import { ModalAddProduct } from "./modal";

const header = ["nip", "name", "code", "created", "updated", "action"];

const SupplierPage: FC = function () {
  const query: any = getQuery();
  const { data, refetch, error, status } = useSupplier(query);

  return (
    <div>
      <Card className="m-1">
        {/* header */}
        <div className="mb-1 flex w-full items-center justify-between">
          {/* title */}
          <h1 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Supplier
          </h1>
          <ModalAddProduct>
            <Button
              className=" bg-blue-500 text-white hover:bg-blue-600"
              leftIcon={<FaPlus />}
            >
              Add New
            </Button>
          </ModalAddProduct>
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
                    {renderDateTime(v.createdAt)}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
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

export default SupplierPage;
