import React from 'react'
import {
  FormControl,
  InputLabel,
  FilledInput,
  FormHelperText,
  InputBase,
  InputBaseProps
} from '@mui/material'
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseControllerProps,
  UseFormRegister
} from 'react-hook-form'
import styles from './input.module.scss'

export interface propInputType extends InputBaseProps {
  label?: string
  height?: string
  width?: string
  customStyle?: string
  containerStyle?: string
  radius?: string
  helperText?: string | FieldError | any
  control: Control<FieldValues | any>
  register: UseFormRegister<FieldValues | any>
  name: string
  onChangeHandle?: (value: any) => void
}

const Inputs = ({
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
  size = 'small',
  hidden,
  readOnly,
  onChangeHandle,
  sx
}: propInputType) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { invalid, isTouched, isDirty, error }
      }) => (
        <FormControl
          size={size}
          error={invalid || !!helperText}
          variant="filled"
          className={`${!label && styles.noneLabel}`}
          sx={{
            ...sx,
            width: width
          }}
        >
          {!!label && (
            <InputLabel htmlFor={name} className={styles.input_label}>
              {label}
            </InputLabel>
          )}
          <FilledInput
            readOnly={readOnly}
            inputRef={inputRef}
            disabled={disabled}
            id={name}
            // value={typeof value === "object" ? value?.name : value}
            placeholder={placeholder}
            startAdornment={startAdornment}
            endAdornment={endAdornment}
            className={`${styles.input_custom} ${customStyle} ${
              disabled && styles.disabled
            } ${!!hidden ? styles.hidden : ''}`}
            {...register(name, {
              // setValueAs: (v: any) => (type === "tel" ? "" : v),
            })}
            inputProps={{
              autoComplete: 'off',
              // maxLength: type === 'tel' ? 13 : name === 'otp' ? 6 : undefined,
              ...inputProps
            }}
            onChange={({
              target: { value, files }
            }: React.ChangeEvent<HTMLInputElement>) => {
              const valInput = type === 'file' ? files : value
              onChange(valInput)
              onChangeHandle && onChangeHandle(valInput) // emit a function onChange
            }}
            type={type}
            sx={{ height: height, borderRadius: radius }}
            onKeyDown={onKeyDown}
          />
          {helperText && (
            <FormHelperText id={name}> {helperText} </FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}

export default Inputs
