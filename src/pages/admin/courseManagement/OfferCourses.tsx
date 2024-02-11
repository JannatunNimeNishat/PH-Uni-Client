import { Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";

import PHInput from "../../../components/form/PHInput";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultiesQuery,

} from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllCoursesQuery, useGetAllRegisteredSemestersQuery } from "../../../redux/features/admin/courseManagement.api";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";

const OfferCourses = () => {
  const [id, setId] = useState("");

  console.log("inside parent compo: ", id);

  const { data: academicFacultyData } =
    useGetAllAcademicFacultiesQuery(undefined);

  const { data: semesterRegistration } =
    useGetAllRegisteredSemestersQuery(undefined);

    const {data:academicDepartment} = useGetAllAcademicDepartmentQuery(undefined);
    
    const {data:courses,isLoading:isCourseLoading}= useGetAllCoursesQuery(undefined);
    const {data:faculties,isLoading:isFLoading} = useGetAllFacultiesQuery(undefined,{skip:isCourseLoading});
    console.log({faculties});
    const facultiesOptions = faculties?.data?.map((item:any)=>({
      value:item._id,
      label:item.name
    }));

    const coursesOptions = courses?.data?.map((item:any)=>({
      value:item._id,
      label:item?.title
    }));

    const academicDepartmentOptions = academicDepartment?.data?.map((item:any)=>({
      value:item?._id,
      label:item?.name
    }))

  const semesterRegistrationOptions = semesterRegistration?.data?.map(
    (item: any) => ({
      value: item._id,
      label: `${item?.academicSemester.name} ${item?.academicSemester.year}`,
    })
  );
 
  const academicFacultyOptions = academicFacultyData?.data?.map(
    (item: any) => ({
      value: item._id,
      label: `${item.name}`,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Flex align="center" justify="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            label="Semester Registration"
            name="semesterRegistration"
            options={semesterRegistrationOptions}
          />
          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
          />
          <PHSelect
            label="Academic Department"
            name="academicDepartment"
            options={academicDepartmentOptions}
          />
          <PHSelectWithWatch
          label="Courses"
          name='course'
          options={coursesOptions}
          onValueChange={setId}
          />
          <PHSelect
          disabled={!id || isCourseLoading}
          mode={"multiple"}
          label="Faculties"
          name="faculty"
          options={facultiesOptions}
          />
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourses;
