import { Card, Table } from "flowbite-react";
import { type FC } from "react";
import { InfoScreen } from "../../components/infoScreen";
import TabelComponent from "../../components/tabel";
import { useAttendance } from "../../hooks/attendance";
import { getQuery, renderDate, renderTime } from "../../utils/helper";

const header = ["date", "employee", "check in", "check out", "action"];

const AttendancePage: FC = function () {
  const query: any = getQuery();
  const { data, refetch, error, status } = useAttendance({
    pageSize: 50,
    ...query,
  });

  return (
    <div>
      <Card className="m-1">
        <h1 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Attendance
        </h1>
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
                  <td className="w-40 whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {renderDate(v.date)}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {v.employee.name}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {renderTime(v.checkInTime)}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 dark:text-white">
                    {renderTime(v.checkOutTime)}
                  </td>
                  {/* <td className="w-[50px]">
                    <ActionMenu data={v} refetch={refetch} />
                  </td> */}
                </Table.Row>
              ))}
            </Table.Body>
          </TabelComponent>
        </InfoScreen>
      </Card>
    </div>
  );
};

export default AttendancePage;
