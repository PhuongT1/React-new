import React from 'react'
import {
  FormControl,
  InputLabel,
  FilledInput,
  FormHelperText,
  InputBaseProps
} from '@mui/material'
import {
  Control,
  Controller,
  FieldError,
  FieldPath,
  FieldValues,
  UseFormRegister
} from 'react-hook-form'
import styles from './input.module.scss'

export interface InputElementProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends InputBaseProps {
  label?: string
  height?: string
  width?: string
  customStyle?: string
  containerStyle?: string
  radius?: string
  helperText?: React.ReactNode
  control: Control<TFieldValues>
  register: UseFormRegister<TFieldValues>
  name: TName
  onChangeHandle?: (value: any) => void
}

const Inputs = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
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
}: InputElementProps<TFieldValues, TName>) => {
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
