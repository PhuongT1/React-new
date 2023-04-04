import { Controller, UseControllerProps } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Input from '../Input';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface DatePickersProps extends UseControllerProps {}
const DatePickers = ({
  label,
  name,
  control,
  register,
  inputFormat = 'YYYY-MM-DD',
  width = '150px',
  helperText
}: any) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { invalid, isTouched, isDirty, error }
      }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="custorm-datePicker"
            inputFormat={inputFormat}
            label={label}
            value={value}
            onChange={(e) => onChange && onChange(e)}
            renderInput={(ele: any) => (
              <Input
                width={width}
                {...ele}
                helperText={helperText}
                register={register}
                endAdornment={ele.InputProps.endAdornment}
                name={name}
                control={control}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default DatePickers;
