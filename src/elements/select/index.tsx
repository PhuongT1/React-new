import React from 'react'
import { FormControl, InputLabel, Input, FilledInput, FormHelperText, Select, MenuItem } from '@mui/material'
import { Controller } from 'react-hook-form'
import styles from './select.module.scss'
// const phoneNumberReplaceRegex = /[(a-zA-Z)(?=.*!@#$%^&*()+_/;:"'/?>.,<[{}\])]/g

const Selects: React.FC<any> = ({
    name,
    control,
    width = '100%',
    containerStyle = '',
    register,
    size= 'small',
    inputLabel,
    menuItem,
    option = []
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { invalid, isTouched, isDirty, error } }) => (
                <FormControl
                    size={size}
                    error={invalid}
                    variant="filled"
                    className={`${styles.form_control} ${containerStyle}`}
                    sx={{
                        width: width
                    }}
                >
                    <InputLabel id="demo-simple-select-label">{inputLabel}</InputLabel>
                    <Select
                        onChange={(e) => { if (onChange) {onChange(e)}}}
                        {...register(name)}
                        labelId="demo-simple-select-label"
                        id={name}
                        value={value}
                        label="Age"
                    >
                    {
                    option?.map((item: any, index: number) =>(
                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                    ))}    
                    </Select>
                </FormControl>

            )}
        />
    )
}

export default Selects
