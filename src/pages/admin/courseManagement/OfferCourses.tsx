import { Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";

import PHInput from "../../../components/form/PHInput";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const OfferCourses = () => {
    const [id,setId] = useState('');
    console.log('inside parent compo: ',id);
  const { data: academicFacultyData } =
    useGetAllAcademicFacultiesQuery(undefined);

  const academicSemesterOptions = academicFacultyData?.data?.map((item:any) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Flex align="center" justify="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelectWithWatch
          onValueChange={setId}
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <PHInput disabled={!id} type="text" name="test" label="test" />
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourses;
