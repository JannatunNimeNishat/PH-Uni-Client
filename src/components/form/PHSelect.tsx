import { Form, Select, Space } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps ={
    label:string;
    name:string;
    options:{value:string; label:string; disabled?:boolean}[];
}


const PHSelect = ({ label,name,options }:TPHSelectProps) => {
  return (
    <Controller
    name={name}
      render={({field, fieldState:{error}}) => (
        <Form.Item label={label}>
          <Select
          {...field}
            style={{ width: "100%" }}
            options={options}
            size="large"
          />
        {error && <small style={{color:'red'}}>{error?.message}</small>}
        </Form.Item>
      )}
    />
   /*  <Controller
    name={name}
      render={({field:{onChange}}) => (
        <Form.Item label={label}>
          <Select
          onChange={onChange}
            style={{ width: "100%" }}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </Form.Item>
      )}
    /> */
  );
};

export default PHSelect;
