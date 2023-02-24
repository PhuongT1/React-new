import { useNavigate } from 'react-router-dom';
import style from './search.module.scss';
import TextField from '@mui/material/TextField';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Input from '../../elements/Input'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

const Search = (props: any) => {
    const [value, setValue] = useState<Dayjs | null>(null);
    const [value1, setValue1] = useState<Dayjs | null>(null);
    const [age, setAge] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    const [parentCallback, setParentCallback] = useState<any>('');

    const schema = yup.object().shape({
        startDay: yup
            .string()
            .email("Vui lòng nhập đúng định dạng email.")
            .required("Vui lòng nhập email."),
        endDay: yup
            .string()
            .required("Vui lòng nhập password.")
            .matches(
                /^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,30}$/,
                "Vui lòng nhập đúng định dạng password."
            ),
    });

    const form = useForm({
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
    
    return (
        <div className={style['layer-item']}>
            <form >
                <div className={style['label-item']}>가입일</div>
                <div className={style['layer-datepicker']}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="종료일"
                        value={value}
                        onChange={(e) => {
                            // setValue(e);
                        }}
                        renderInput={(startDay:any) => (
                            <Input {...startDay}  helperText={''} register={register} endAdornment={startDay.InputProps.endAdornment}  name='startDay' control={control}/>
                        )}
                    />
                    
                    </LocalizationProvider>
                </div>
                <div className={style['label-item']} >~</div>
                <div className={style['layer-datepicker']}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="시작일"
                        value={value1}
                        onChange={(newValue) => {
                            setValue1(newValue);
                        }}
                        renderInput={(params) => <TextField variant="filled" {...params} />}
                    />
                    </LocalizationProvider>
                </div>
                <div className={style['label-item']}>
                    검색구분
                </div>
                <div className={style['search-item']}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                        >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField id="filled-basic" label="Filled" variant="filled" />
                </div>
                <div className={style['btn-search']}>
                    <Button variant="contained" onClick={() => {
                        props.parentCallback({'phuong tran': 'gia tri nhe cac ban'})
                        // console.log('getValues', getValues())
                    }}>Contained</Button>
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
