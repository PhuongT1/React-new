import { useNavigate } from "react-router-dom";
import styleLogin from "./login.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import http from "services/axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "elements/Input/index";
import Loading from "elements/loading";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { User, Token } from "./login.type";
import { AxiosResponse } from "axios";
const Login = (props: any) => {
  const navigate = useNavigate();
  const [dataToken, setdataToken] = useState<AxiosResponse | Token>({});
  const [showLoading, setshowLoading] = useState<boolean>(false);
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Vui lòng nhập đúng định dạng email.")
      .required("Vui lòng nhập email."),
    password: yup
      .string()
      .required("Vui lòng nhập password.")
      .matches(
        /^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,30}$/,
        "Vui lòng nhập đúng định dạng password."
      ),
  });

  const form = useForm<User>({
    defaultValues: { email: "admin2@test.com", password: "Abcd1234@" },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = form;

  const token = (dataToken?: any) => {
    return {
      type: "saveToken",
      data: dataToken,
    };
  };

  useEffect(() => {
    console.log("useEffect", dataToken)
  });

  const fetchData = async (data: User) => {
    try {
      const response = await http.post(`/login`, data);
      localStorage.setItem("user", JSON.stringify(response));
      props.dispatch(token(response));
      setshowLoading(false);
      navigate("/admin/member-manage");
    } catch (error: any) {
      setError(error.error_field, { message: error?.message });
    }
  };

  const handleSubmitForm = (data: User) => {
    setshowLoading(true);
    fetchData(data);
  };

  return (
    <div className={styleLogin["layer-item"]}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={`${styleLogin["layer-content"]}`}>
          <div className={`${styleLogin["row-item"]}`}>
            {showLoading && <Loading />}
            <Input
              width={"100%"}
              label="Email"
              helperText={errors.email?.message}
              register={register}
              name="email"
              control={control}
            />
          </div>
          <div className={styleLogin["row-item"]}>
            <Input
              width={"100%"}
              type="password"
              label="Password"
              helperText={`${
                errors.password?.message ? errors.password?.message : ""
              }`}
              register={register}
              name="password"
              control={control}
            />
          </div>
          <div
            className={`${styleLogin["row-item"]} ${styleLogin["btn-login"]}`}
          >
            <Button type="submit" variant="contained">
              로그인
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};
export default connect(mapStateToProps)(Login);
