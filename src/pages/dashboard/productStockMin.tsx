import { Card, Table } from "flowbite-react";
import { type FC } from "react";
import Button from "../../components/button";
import { InfoScreen } from "../../components/infoScreen";
import TabelComponent from "../../components/tabel";
import { useProductStockMin } from "../../hooks/product";
import { getQuery } from "../../utils/helper";

const header = ["image", "name", "category", "quantity", "quantity min"];

const ProductStockMin: FC = function () {
  const query: any = getQuery();
  const { data, refetch, error, status } = useProductStockMin({
    pageIndex: 1,
    pageSize: 10,
    ...query,
  });

  return (
    <div>
      {/* render data */}
      <Card className="m-1">
        <div className="mb-1 flex w-full items-center justify-between">
          {/* title */}
          <h1 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Products Below Minimum Quantity
          </h1>
          {/* filter */}
          <a href="product">
            <Button className="dark:text-white">See More</Button>
          </a>
        </div>

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
                    <span className=" font-semibold">{v.productCode}</span>
                    {" - " + v.productName}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    <span className=" font-semibold">{v.categoryCode}</span>
                    {" - " + v.categoryName}
                  </td>
                  <td className="w-32 whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.qty}
                  </td>
                  <td className="w-32 whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.qtyMin}
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

export default ProductStockMin;
