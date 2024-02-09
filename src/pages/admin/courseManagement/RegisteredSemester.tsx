import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { TQueryParam, TSemester } from "../../../types";
import { useGetAllRegisteredSemestersQuery, useUpdateRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { useState } from "react";

// pick use kora already existed akta type teka new type banano jai
export type TTableData = Pick<TSemester, "status" | "startDate" | "endDate">;

// drop down items
const items = [
  { label: "UPComing", key: "UPCOMING" },
  { label: "ONGoing", key: "ONGOING" },
  { label: "Ended", key: "ENDED" },
];

const RegisteredSemester = () => {
  //const [params, setParams] = useState<TQueryParam[] | undefined>([]);
  const [semesterId, setSemesterId] = useState("");
  // console.log(semesterId);
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllRegisteredSemestersQuery(undefined);
  
  const [updateSemesterStatus] = useUpdateRegisteredSemesterMutation(); 

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
      status,
    })
  );

  //   drop down
  const handleStatusUpdate = (data) => {
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    updateSemesterStatus(updateData);
  };

  //   drop down
  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  // filtering
  /*  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {

    const queryParams: TQueryParam[] = [];
    if (extra.action === "filter") {
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
    }
    setParams(queryParams);
    console.log(queryParams);
  }; */

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      //onChange={onChange}
    />
  );
};

export default RegisteredSemester;
