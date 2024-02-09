import { Form, Select, Space } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?:boolean;
  mode?:'multiple'| undefined;
};

const PHSelect = ({ label, name, options, disabled,mode }: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
          mode={mode} // jodi mode ase taile multiple sellect hobe, r na asole normal sellect. mode = muliple | undefinded
            {...field}
            style={{ width: "100%" }}
            options={options}
            size="large"
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error?.message}</small>}
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
