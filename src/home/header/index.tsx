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
