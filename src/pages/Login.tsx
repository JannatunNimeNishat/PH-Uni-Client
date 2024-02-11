import { Button, Row } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, logout, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

/**Folow of this page
 *
 */

const Login = () => {
  const navigate = useNavigate();
  /* const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "admin12345",
    },
  }); */

  const defaultValues = {
    userId: "2024030001",
    password: "student123",
    /*  userId: "A-0001",
    password: "admin123", */
  };

  const [login, { error }] = useLoginMutation();
  const dispatch = useAppDispatch();


  const onSubmit = async (data: { userId: string; password: string }) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      console.log(res?.data);
      //console.log(userInfo,{ user: user, token: res.data.accessToken });
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      if(res?.data?.needsPasswordChange){
        console.log('rached');
       // dispatch(logout());
      return  navigate('/change-password');
      }else{
        navigate(`/${user.role}/dashboard`);
      }


    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type={"text"} name={"userId"} label={"ID: "} />

        <PHInput type={"text"} name={"password"} label={"Password: "} />

        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
