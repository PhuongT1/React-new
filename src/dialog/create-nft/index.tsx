import styleNft from './create-nft.module.scss'
import MenuItem from '@mui/material/MenuItem'
import { useRef, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import Inputs from 'elements/Input'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Nft } from 'models/nft.type'
import Select from 'elements/select'
import http from 'services/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Loading from 'elements/loading'

// interface for Props
export interface NftProps {
  open: boolean
  onClose: (value?: string) => void
}

const CreateNft = (props: NftProps) => {
  const { onClose, open } = props
  const optionSearch = [
    { value: 'ERC-721', label: 'ERC-721' },
    { value: 'ERC-1155', label: 'ERC-1155' }
  ]
  const formRef = useRef<any>(null) // set ref

  // validate form with yub
  const schema = yup.object().shape({
    name: yup.string().required('Name is field required'),
    contract_address: yup.string().required(),
    token_standard: yup.string().required(),
    image: yup
      .mixed()
      .test('required', 'photo is required', (file: any) => {
        console.log('value', file)
        if (file?.length > 0) return true
        return false
      })
      .test('fileSize', 'File Size is too large', (value: any) => {
        return value.length && value[0].size <= 5242880
      })
      .test('fileType', 'Unsupported File Format', (value: any) => {
        return (
          value?.length &&
          ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type)
        )
      })
  })

  const form = useForm<Nft>({
    defaultValues: {
      block_chain: '이더리움',
      token_standard: '',
      name: '',
      contract_address: '',
      image: '',
      imageName: ''
    },
    mode: 'onTouched',
    resolver: yupResolver(schema)
  })

  const {
    register,
    control,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
    clearErrors,
    setError,
    reset
  } = form

  // set ref
  const { ref, onChange, ...rest } = register('image')

  const onSubmit = async (data: FormData) => {
    // return promise
    await http.post(`admin/nft`, data)
  }

  const queryClient = useQueryClient()
  const { isLoading: loadingItem, mutate } = useMutation(onSubmit, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        'nft-manage',
        {
          per_page: 15,
          page: 1,
          order_by: `desc`
        }
      ])
      onClose()
    },
    onError: (error: any) => {
      error.message.name === 'name' &&
        setError('name', { message: error.message.name[0] })
    }
  })

  // Render option of select
  const menuItem = (item?: any, index?: number): JSX.Element => {
    return (
      <>
        <MenuItem value={item.value}>{item.label}</MenuItem>
      </>
    )
  }

  const setDataForm = (data: Nft) => {
    const formData: FormData = new FormData()
    formData.append('name', data.name)
    formData.append('contract_address', data.contract_address)
    formData.append('token_standard', data.token_standard)
    formData.append('block_chain', data.block_chain)
    formData.append('image', data?.image[0])

    // submit data to form
    mutate(formData)
  }
  return (
    <Dialog fullWidth={true} maxWidth={'sm'} open={open}>
      <form
        className={`${styleNft['form-data']}`}
        onSubmit={handleSubmit(setDataForm)}
      >
        {loadingItem && <Loading />}
        <DialogContent>
          <div className={`${styleNft['row-item']}`}>
            <label>Name</label>
            <div className={styleNft.layerInput}>
              <Inputs
                width={'100%'}
                register={register}
                name="name"
                control={control}
                helperText={errors.name?.message}
              />
            </div>
          </div>
          <div className={`${styleNft['row-item']}`}>
            <label>Contract address</label>
            <div className={styleNft.layerInput}>
              <Inputs
                width={'100%'}
                register={register}
                name="contract_address"
                control={control}
              />
            </div>
          </div>
          <div className={`${styleNft['row-item']}`}>
            <label>Blockchain</label>
            <div className={styleNft.layerInput} style={{ marginTop: '17px' }}>
              이더리움
            </div>
          </div>
          <div className={`${styleNft['row-item']}`}>
            <label>Token Standard</label>
            <div className={styleNft.layerInput}>
              <Select
                option={optionSearch}
                menuItem={menuItem}
                register={register}
                name="token_standard"
                control={control}
              />
            </div>
          </div>
          <div className={`${styleNft['row-item']}`}>
            <label>Image</label>
            <div className={styleNft.layerInput}>
              <input
                className={styleNft.hidden}
                {...rest}
                ref={(e) => {
                  ref(e)
                  formRef.current = e
                }}
                type="file"
                name="image"
                onChange={(e) => {
                  onChange(e)
                  const file = getValues().image[0] as File
                  setValue('imageName', file && file.name)
                  trigger('image')
                }}
              />
              <Inputs
                type="text"
                width={'100%'}
                register={register}
                helperText={`${
                  errors.image?.message ? errors.image?.message : ''
                }`}
                name="imageName"
                readOnly={true}
                control={control}
              />
            </div>
            <div className={`${styleNft['btn-item']}`}>
              <Button
                variant="contained"
                autoFocus
                onClick={() => {
                  formRef?.current?.click()
                }}
              >
                Upload
              </Button>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              onClose()
              reset()
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            autoFocus
            onClick={async () => {
              console.log('getValues', getValues())
              await trigger()
            }}
          >
            Complete
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

const mapStateToProps = (state: any) => {
  return {
    state: state
  }
}
export default CreateNft
