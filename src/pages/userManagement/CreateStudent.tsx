import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../constants/global";
import PHDatePicker from "../../components/form/PHDatePicker";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicSemestersQuery,
} from "../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../redux/features/admin/userManagement.api";
import { toast } from "sonner";

const studentDummyData = {
  password: "student123",
  student: {
    name: {
      firstName: "Student2",
      middleName: "student2",
      lastName: "student2",
    },
    gender: "female",
    dateOfBirth: "1990-01-01",
    bloogGroup: "A+",

    email: "student2@gmail.com",
    contactNo: "123456",
    emergencyContactNo: "9876543210",
    presentAddress: "123 Main Street, Cityville",
    permanentAddress: "456 Oak Avenue, Townsville",

    guardian: {
      fatherName: "David Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "1111111111",
      motherName: "Emily Doe",
      motherOccupation: "Doctor",
      motherContactNo: "2222222222",
    },

    localGuardian: {
      name: "Alice Johnson",
      occupation: "Teacher",
      contactNo: "3333333333",
      address: "789 Pine Road, Villagetown",
    },

    admissionSemester: "65bc7c270c2f4f6e5f512586",
    academicDepartment: "65ba09e5f9baf69a0f26e74d",
  },
};

//! for development
//! should be removed
const studentDefaultValues = {
  name: {
    firstName: "I am ",
    middleName: "Student",
    lastName: "Number 1",
  },
  gender: "male",

  bloogGroup: "A+",

  contactNo: "1235678",
  emergencyContactNo: "987-654-3210",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",

  guardian: {
    fatherName: "James Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "111-222-3333",
    motherName: "Mary Doe",
    motherOccupation: "Teacher",
    motherContactNo: "444-555-6666",
  },

  localGuardian: {
    name: "Alice Johnson",
    occupation: "Doctor",
    contactNo: "777-888-9999",
    address: "789 Pine St, Villageton",
  },

  admissionSemester: "65bfa1afc1e4c9b0a3fb0be5",
  academicDepartment: "65c4b191c6ade1b5ec5f003c",
};

const CreateStudent = () => {
  //add student
  const [addStudent, { data, error }] = useAddStudentMutation();

  console.log({ data, error });

  const { data: sData, isLoading: sIsLoading } =
    useGetAllAcademicSemestersQuery(undefined);

  // skip:sIsLoading uporar call ta ses na hoa porjonto nicher ta skip korbe.call ses hole nicher ta call hobe
  const { data: dData, isLoading: dLoading } =
    useGetAllAcademicDepartmentQuery(undefined);
  /*   const { data: dData, isLoading: dLoading } = useGetAllAcademicDepartmentQuery(
    undefined,
    { skip: sIsLoading }
  ); */

  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));
  const departmentOptions = dData?.data?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> =  (data) => {
    const toastId = toast.loading("student creating....");
    console.log(data);

    const studentData = {
      password: "student123",
      student: data,
    };

    const formData = new FormData();
    // formData te kisu add korte caile append korte hoy
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image);


   addStudent(formData);
    
  

    // addStudent(formData);
    //! this is for development
    //! just checking
    console.log(Object.fromEntries(formData));
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Row gutter={8}>
            <Divider>Personal info.</Divider>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              {/* <PHInput type="text" name="gender" label="Gender" /> */}
              <PHSelect name="gender" label="Gender" options={genderOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="DateOfBirth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              {/* <PHInput type="text" name="bloogGroup" label="Blood Group" /> */}
              <PHSelect
                name="bloogGroup"
                label="Blood Group"
                options={bloodGroupOptions}
              />
            </Col>

            {/*----------------- profile picture ---------------------------*/}
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            {/* <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
              name="image"
              render={({ field: {onChange,value,...field}})=>(
                <Form.Item label="Picture">
                  <Input 
                  type="file" 
                  value={value?.fileName}
                  {...field} 
                  onChange={(e)=>onChange(e.target.files?.[0])}
                  />
                </Form.Item>
              )}
              />
            </Col> */}

            <Divider>Contact Info.</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency ContactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>

            <Divider>Guardian</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father ContactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother ContactNo"
              />
            </Col>

            <Divider>Local Guardian</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.name"
                label="Local Guardian"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="ContactNo."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="address"
              />
            </Col>

            <Divider>Academic Info.</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={semesterOptions}
                disabled={sIsLoading}
                name="admissionSemester"
                label="Admission Semester"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={departmentOptions}
                disabled={sIsLoading}
                name="academicDepartment"
                label="Academic Department"
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
