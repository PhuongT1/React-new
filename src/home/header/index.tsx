import { useNavigate } from 'react-router-dom';
import styleLogin from './login.module.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import http from '../../services/axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Inputs from '../../elements/Input/index'
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
const Header = (props: any) => {
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
            Header
        </div>
    )
}

const mapStateToProps = (state: any) => { 
    return {  
        state: state,
    }; 
};
export default connect(mapStateToProps)(Header);
