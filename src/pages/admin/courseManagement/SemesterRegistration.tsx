import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";

const SemesterRegistration = () => {
  const { data: academicSemester } = useGetAllAcademicSemestersQuery([
    { name: "sort", value: "year" },
  ]);
  const [addSemester, { isError }] = useAddRegisteredSemesterMutation();

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const semesterData = {
      ...data,
      minCredit:Number(data.minCredit),
      maxCredit:Number(data.maxCredit)
    };
    try {
      const res = (await addSemester(semesterData)) as TResponse<any>;
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

  return (
    <Flex align="center" justify="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <PHSelect
            label="Status"
            name="status"
            options={semesterStatusOptions}
          />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PHInput type="text" name="minCredit" label="Min Credit" />
          <PHInput type="text" name="maxCredit" label="Max Credit" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
