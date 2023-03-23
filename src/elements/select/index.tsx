import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Controller } from 'react-hook-form'
import styles from './select.module.scss'
import { OptionDropdow } from 'models/common.type'

interface SelectProps<T, K> {
  name: string
  control: any
  width?: string
  register: any
  size?: 'small' | 'medium'
  label?: string
  option: OptionDropdow[]
  menuItem?: (item: T) => JSX.Element
  menuItem2?: (item: T, value: K) => void
}
const Selects = <T, K>(props: SelectProps<T, K>) => {
  const {
    name,
    control,
    width = '100%',
    register,
    size = 'small',
    label,
    option
  } = props
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
          error={!!error}
          variant="filled"
          sx={{
            width: width
          }}
        >
          <InputLabel id={name}>{label}</InputLabel>
          <Select
            onChange={(e) => {
              if (onChange) {
                onChange(e)
              }
            }}
            {...register(name)}
            labelId={name}
            id={name}
            value={value}
            className={`${!label && styles.noneLabel}`}
          >
            {option.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  )
}

export default Selects
