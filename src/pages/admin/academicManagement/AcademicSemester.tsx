import React, { useState } from "react";
import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { Button, Table, TableColumnsType, TableProps } from "antd";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { TQueryParam } from "../../../types";

// pick use kora already existed akta type teka new type banano jai
export type TTableData = Pick<TAcademicSemester,  'name' | 'year' | 'startMonth' | 'endMonth' >

const AcademicSemester = () => {

  const [params,setParams] = useState<TQueryParam[] | undefined>([]);

  const { data: semesterData, isLoading, isFetching } = useGetAllAcademicSemestersQuery(params);
  // const { data: semesterData } = useGetAllAcademicSemestersQuery([{name:'year', value:2024}]);


  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      key:_id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
    },
    {
      title: "Year",
      key: "year",
      dataIndex: "year",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
      ],
    },
    {
      title: "Start Month",
      key: "startMonth",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      key: "endMonth",
      dataIndex: "endMonth",
    },
    {
      title:'Action',
      key:'x',
      render: ()=>{
        return (
          <div><Button>Update</Button></div>
        )
      }
    }
  ];

  // filtering
  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    //console.log({extra,filters});
    const queryParams:TQueryParam[] = [];

    if(extra.action === 'filter'){

      filters.name?.forEach((item)=>queryParams.push({name:'name',value:item}))
      filters.year?.forEach((item)=>queryParams.push({name:'year',value:item}))

    }
    setParams(queryParams);
    console.log(queryParams);
  };

  if(isLoading){
    return <p>Loading...</p>
  }

  return <Table loading={isFetching} columns={columns} dataSource={tableData} onChange={onChange} />;
};

export default AcademicSemester;
