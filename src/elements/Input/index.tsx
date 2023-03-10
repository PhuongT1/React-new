import React from 'react'
import { FormControl, InputLabel, Input, FilledInput, FormHelperText } from '@mui/material'
import { Controller } from 'react-hook-form'
import styles from './input.module.scss'
// const phoneNumberReplaceRegex = /[(a-zA-Z)(?=.*!@#$%^&*()+_/;:"'/?>.,<[{}\])]/g

const Inputs: React.FC<any> = ({
    label,
    name,
    control,
    startAdornment,
    endAdornment,
    type,
    height = '',
    width = 'auto',
    inputProps,
    customStyle = '',
    onKeyDown,
    placeholder,
    containerStyle = '',
    radius = '',
    disabled,
    register,
    helperText,
    inputRef,
    size= 'small',
    hidden
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
                    className={`${!label ? styles.noneLabel: ''}`}
                    sx={{
                        width: width
                    }}
                >
                    {!!label && (
                        <InputLabel htmlFor={name} className={styles.input_label}>
                        {label}
                        </InputLabel>
                    )}
                    <FilledInput
                        inputRef={inputRef}
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
                        // maxLength: type === 'tel' ? 13 : name === 'otp' ? 6 : undefined,
                        ...inputProps
                        }}
                        className={`${styles.input_custom} ${customStyle} ${disabled && styles.disabled} ${!!hidden ? styles.hidden : ''}`}
                        type={type}
                        sx={{
                        height: height,
                        borderRadius: radius
                        }}
                        onKeyDown={e => {
                        if (onKeyDown) onKeyDown(e)
                        }}
                    />
                    {!!helperText && (<FormHelperText id={name}>
                        {helperText}
                        </FormHelperText>)
                    }
                    
                </FormControl>
            )}
        />
    )
}

export default Inputs
