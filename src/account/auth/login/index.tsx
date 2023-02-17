import { useNavigate } from 'react-router-dom';
import styleLogin from './login.module.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import http from '../../../services/axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Login = (props: any) => {
    const navigate = useNavigate();
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

    const form = useForm({
        defaultValues: { email: 'admin2@test.com', password: 'Abcd1234@' },
        mode: "onTouched",
        resolver: yupResolver(schema),
    });
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = form;

    const fetchData = (data: any) => {
        return http.post(`/login`, data)
            .then((response) => {
                // navigate("/phuong-tran2", {replace: true});
            })
            .catch((error) => {
                console.log('phuong tran', error);
            });;
    }

    const handleSubmitForm = (data: any) => {
        console.log(data);
        fetchData(data);
    }

    const changeData = (event: any) => {
    }

    return (
        <div className={styleLogin['layer-item']}>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className={`${styleLogin['layer-content']}`}>
                    <div className={`${styleLogin['row-item']}`}>
                        <TextField  color="warning" error={errors.email ? true : false} 
                            helperText={`${errors.email?.message ? errors.email?.message : ''}`}
                            {...register("email")} onChange={(e) => {
                                setValue("password", e.target.value)
                                console.log('e', e)}
                            } name="email" className={`${styleLogin['w-100']}`} 
                            label="아이디를 입력해주세요. *" variant="outlined" />
                    </div>
                    <div className={styleLogin['row-item']}>
                        <TextField error={errors.password ? true : false}
                            helperText={`${errors.password?.message ? errors.password?.message : ''}`}
                            {...register("password")} className={`${styleLogin['w-100']}`}
                            type={'password'}
                            label="비밀번호를 입력해주세요. *" variant="outlined" />
                    </div>
                    <div className={`${styleLogin['row-item']} ${styleLogin['btn-login']}`}>
                        <Button type="submit" variant="contained" onClick={fetchData}>로그인</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Login;
