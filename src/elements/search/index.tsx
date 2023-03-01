import style from './search.module.scss';
import { connect } from 'react-redux';
import {useState } from 'react';
import Button from '@mui/material/Button';
import DatePickers from '../../elements/datePicker'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import Selects from '../select';
import Inputs from '../Input';
import { MenuItem } from '@mui/material';

const Search = (props: any) => {
    // const [value, setValue] = useState<Dayjs | null>(null);
    // const [value1, setValue1] = useState<Dayjs | null>(null);
    // const [age, setAge] = useState('');
    // const handleChange = (event: SelectChangeEvent) => {
    //     setAge(event.target.value as string);
    // };
    const [dataSearch, setdataSearch] = useState<any>('');

    const schema = yup.object().shape({
        // startDay: yup
        //     .string(),
        // endDay: yup
        //     .string()
        //     .required("Vui lòng nhập password.")
        //     .matches(
        //         /^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,30}$/,
        //         "Vui lòng nhập đúng định dạng password."
        //     ),
    });

    const form = useForm({
        defaultValues: { startDay: '', order_by: '', endDay: ''},
        mode: "onTouched",
        resolver: yupResolver(schema),
    });
    
    const {
        register,
        control,
        // handleSubmit,
        formState: { errors },
        // setError,
        getValues
    } = form;
    
    const menuItem = (item?: any, index?: number): JSX.Element => {
        return (
            <>
                <MenuItem value={item.value}>{item.label}</MenuItem>
            </>
        )
    }
    
    return (
        <div className={style['layer-item']}>
            <form >
                <div className={style['label-item']}>Start Day</div>
                <div className={style['layer-datepicker']}>
                    <DatePickers width={'160px'} label="시작일" inputFormat="DD-MM-YYYY" register={register} name='startDay' control={control}/>
                </div>
                <div className={style['label-item']} >~</div>
                <div className={style['layer-datepicker']}>
                    <DatePickers width={'160px'} label="시작일" inputFormat="DD-MM-YYYY" register={register} name='endDay' control={control}/>
                </div>
                <div className={style['label-item']}>
                    Search Classification
                </div>
                <div className={style['search-item']}>
                    <Selects option={props.optionSelect} menuItem={menuItem} inputLabel='Choose an option' width={'175px'} register={register} name='order_by' control={control} />
                    <Inputs label="Search" helperText='' register={register} name='search_like' control={control}/>
                </div>
                <div className={style['btn-search']}>
                    <Button sx={{textTransform: "none"}}  variant="contained" onClick={() => {
                        props.emitDataSearch(getValues())
                    }}>Search</Button>
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
export default connect(mapStateToProps)(Search);
