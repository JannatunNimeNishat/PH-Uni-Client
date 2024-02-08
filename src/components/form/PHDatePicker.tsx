import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TDateProps = {
    name:string;
    label?:string;
}

const PHDatePicker = ({name,label}:TDateProps) => {
    return (
        <Controller
        name={name}
        render={({field})=>(
            <Form.Item label={label}>
                <DatePicker {...field} size="large" style={{width:'100%'}}/>
            </Form.Item>
        )}
        />
    );
};

export default PHDatePicker;