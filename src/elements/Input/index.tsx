import React from 'react'
import { FormControl, InputLabel, OutlinedInput } from '@mui/material'
import { Controller } from 'react-hook-form'
import styles from './input.module.scss'
const phoneNumberReplaceRegex = /[(a-zA-Z)(?=.*!@#$%^&*()+_/;:"'/?>.,<[{}\])]/g
const Input: React.FC<any> = ({
    label,
    name,
    control,
    startAdornment,
    endAdornment,
    type,
    height = 46,
    width = '100%',
    inputProps,
    customStyle = '',
    onKeyDown,
    placeholder,
    containerStyle = '',
    radius = 4,
    disabled,
    register
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { invalid, isTouched, isDirty, error } }) => (
                <FormControl
                    className={`${styles.form_control} ${containerStyle}`}
                    sx={{
                        width: width
                    }}
                >
                    {!!label && (
                        <InputLabel htmlFor={name} className={styles.input_label}>
                        {label}
                        </InputLabel>
                    )}    
                    <OutlinedInput
                        disabled={disabled}
                        id={name}
                        value={typeof value === 'object' ? value?.name : value}
                        onChange={({ target: { value } }) => onChange(value)}
                        placeholder={placeholder}
                        startAdornment={startAdornment}
                        endAdornment={endAdornment}
                        {...register(name, {
                        setValueAs: (v: any) => (type === 'tel' ? '' : v)
                        })}
                        inputProps={{
                        autoComplete: 'off',
                        maxLength: type === 'tel' ? 13 : name === 'otp' ? 6 : undefined,
                        ...inputProps
                        }}
                        className={`${styles.input_custom} ${customStyle} ${disabled && styles.disabled}`}
                        type={type}
                        sx={{
                        height: height,
                        borderRadius: radius
                        }}
                        onKeyDown={e => {
                        if (onKeyDown) onKeyDown(e)
                        }}
                    /> 
                </FormControl>
            )}
        />
    )
}

export default Input
