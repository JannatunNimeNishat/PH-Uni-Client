import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormProps = {
  //   onSubmit: SubmitHandler<FieldValues>;
  onSubmit: SubmitHandler<any>;
  children: ReactNode;
} & TFormConfig;

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

const PHForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TFormProps) => {
  const formConfig: TFormConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);
  
  //to reset/clear the form after submit
  const submit:SubmitHandler<FieldValues> = (data) =>{
    onSubmit(data);
    methods.reset();
  }
  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
      {/* <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}> */}
      {/* <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form> */}
    </FormProvider>
  );
};

export default PHForm;
