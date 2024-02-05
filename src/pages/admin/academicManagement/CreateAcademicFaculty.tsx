import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import PHSelect from "../../../components/form/PHSelect";
import { academicSemesterOptions } from "../../../constants/semester";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const CreateAcademicFaculty = () => {
    const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit = async(data:{name:string}) => {
    const toastId = toast.loading('Creating...')
      const academicSemesterData = {
          name:data?.name
        }
        try {
            const res = await addAcademicFaculty(academicSemesterData) as TResponse;
            //console.log(res?.data);
            if(res?.error){
                toast.success(res.error.data.message,{id:toastId,duration:2000})

            }else{
                toast.success(res?.data?.message,{id:toastId,duration:2000})
            }

        } catch (error) {
            toast.error('Something went wrong',{id:toastId, duration:2000})
        }
        console.log(academicSemesterData);
  };
  return (
   <Flex align="center" justify="center">
     <Col span={6}>
     <PHForm onSubmit={onSubmit} resolver={zodResolver(academicFacultySchema)}>
        <PHSelect name="name" label="Faculty name"  options={academicSemesterOptions}/>
       
        <Button htmlType="submit">Submit</Button>
    </PHForm>
     </Col>
   </Flex>
  );
};

export default CreateAcademicFaculty;
