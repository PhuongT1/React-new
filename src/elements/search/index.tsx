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

const Search = (props: any) => {
    const [value, setValue] = useState<Dayjs | null>(null);
    const [age, setAge] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
      };
    return (
        <div className={style['layer-item']}>
            <form>
                <div>가입일</div>
                <div className={style['layer-datepicker']}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Basic example"
                        value={value}
                        onChange={(newValue) => {
                        setValue(newValue);
                        }}
                        renderInput={(params) => <TextField variant="filled" {...params} />}
                    />
                    </LocalizationProvider>
                </div>
                <div>~</div>
                <div className={style['layer-datepicker']}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Basic example"
                        value={value}
                        onChange={(newValue) => {
                        setValue(newValue);
                        }}
                        renderInput={(params) => <TextField variant="filled" {...params} />}
                    />
                    </LocalizationProvider>
                </div>
                <div>
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
                <div>
                    <Button variant="contained">Contained</Button>
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
