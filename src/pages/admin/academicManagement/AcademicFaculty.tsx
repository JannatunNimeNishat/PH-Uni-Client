import { Button, Table, TableColumnsType, TableProps } from 'antd';
import React from 'react';
import { useGetAllAcademicFacultiesQuery } from '../../../redux/features/admin/academicManagement.api';

interface DataType {
    name: string;
  }
const AcademicFaculty = () => {
    const {data:academicSemesters, isLoading, isFetching} = useGetAllAcademicFacultiesQuery(undefined)
      
      const columns: TableColumnsType<DataType> = [
        {
          title: 'Name',
          dataIndex: 'name',
          filters: [
            
          ],
        },
        {
            title:'Action',
            render:()=>{
                return(
                    <div><Button>Update</Button></div>
                )
            }
        }
      ];
      const tableData = academicSemesters?.data?.map((item:{_id:string,name:string})=>({
        key:item._id,
        name:item?.name
      }))
    
      
      const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };
      if(isLoading){
        return <p>Loading...</p>
      }

    return <Table loading={isFetching} columns={columns} dataSource={tableData} onChange={onChange} />;
    
};

export default AcademicFaculty;