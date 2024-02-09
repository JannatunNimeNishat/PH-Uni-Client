import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemestersMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemestersMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const name = semesterOptions[Number(data.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      year: data?.year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth,
    };
    try {
      const res = await addAcademicSemester(semesterData) as TResponse<any>;
      if (res?.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Semester created", { id: toastId, duration: 2000 });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
    console.log(semesterData);
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
    value: String(currentYear + number),
    label: String(currentYear + number),
  }));

  return (
    // <Flex align="center" justify="center" style={{ height: "200vh" }}>
    <Flex align="center" justify="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect name="name" label="Name" options={semesterOptions} />
          <PHSelect name="year" label="Year" options={yearOptions} />
          <PHSelect
            name="startMonth"
            label="Start Month"
            options={monthOptions}
          />
          <PHSelect name="endMonth" label="End Month" options={monthOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
