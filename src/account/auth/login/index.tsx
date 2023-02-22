import { useNavigate } from 'react-router-dom';
import styleLogin from './login.module.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import http from '../../../services/axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Inputs from '../../../elements/Input/index'
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
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
        control,
        handleSubmit,
        formState: { errors },
        setError,
        getValues
    } = form;

    const token = (dataToken?: any) => {
        return {
            type: "saveToken",
            data: dataToken
        };
    }
    const [dataToken, setdataToken] = useState<any>({})

    useEffect(() => {})

    const fetchData = async (data:any) => {
        try {
            const response = await http.post(`/login`, data)
            setdataToken(response)
            props.dispatch(token(response))
            navigate('/home')
        } catch (error: any) {
            setError(error.error_field, {'message': error?.message})
        }
    }

    const handleSubmitForm = (data: any) => {
        fetchData(data);
    }

    const changeData = (data: any) => {
        console.log('data', data);
    }

    return (
        <div className={styleLogin['layer-item']}>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className={`${styleLogin['layer-content']}`}>
                    <div className={`${styleLogin['row-item']}`}>
                        {/* <TextField  color="warning" error={errors.email ? true : false} 
                            helperText={`${errors.email?.message ? errors.email?.message : ''}`}
                            {...register("email")} onChange={(e) => {
                                setValue("password", e.target.value)
                                console.log('e', e)}
                            } name="email" className={`${styleLogin['w-100']}`} 
                            label="아이디를 입력해주세요. *" variant="outlined" /> */}
                        <Inputs label="Email" helperText={errors.email?.message} register={register} name='email' control={control}/>    
                    </div>
                    <div className={styleLogin['row-item']}>
                        <TextField error={errors.password ? true : false}
                            helperText={`${errors.password?.message ? errors.password?.message : ''}`}
                            {...register("password")} className={`${styleLogin['w-100']}`}
                            type={'password'}
                            label="비밀번호를 입력해주세요. *" />
                    </div>
                    <div>
                    {/* <Button variant="contained" onClick={() => changeData(getValues())}>Log Data</Button> */}
                    </div>
                    <div className={`${styleLogin['row-item']} ${styleLogin['btn-login']}`}>
                        <Button type="submit" variant="contained">로그인</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state: any) => { 
    return {  
        state: state,
    }; 
};
export default connect(mapStateToProps)(Login);
