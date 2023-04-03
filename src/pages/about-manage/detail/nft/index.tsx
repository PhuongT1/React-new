import { yupResolver } from '@hookform/resolvers/yup'
import { Button, MenuItem } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Nft } from 'models/nft.type'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import http from 'services/axios'
import style from './nft.module.scss'
import * as yup from 'yup'
import Inputs from 'elements/Input'
import Select from 'elements/select'
import Loading from 'elements/loading'
import { convertName } from 'services/common.service'
import PreviewImage from 'dialog/preview-image'

const NftDetail = () => {
  const { id } = useParams()
  const inputUpload = useRef<HTMLInputElement>(null)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [isStatusEdit, setStatusEdit] = useState<boolean>(() => false)
  const optionSearch = [
    { value: 'ERC-721', label: 'ERC-721' },
    { value: 'ERC-1155', label: 'ERC-1155' }
  ]

  const getList = async ({ queryKey }: { queryKey: [string, number] }) => {
    const [_, id] = queryKey
    const response = await http.get(`/admin/nft/${id}`)
    return response.data as Nft
  }

  const updateNft = async (dataForm: FormData) => {
    const response = await http.post<Nft>(`/admin/nft/${id}`, dataForm)
    return response.data
  }

  // useQuery in order to cache data
  const { data, isLoading } = useQuery(['nft-detail', Number(id)], getList, {
    refetchOnWindowFocus: false
  })

  // useMutation in order to cache data and post data to server
  const queryClient = useQueryClient()

  const {
    data: dataEdit,
    isLoading: isLoadingEdit,
    error: errorUpdate,
    mutate
  } = useMutation(updateNft)

  useEffect(() => {
    if (dataEdit) {
      queryClient.setQueryData(['nft-detail', Number(id)], dataEdit)
      setStatusEdit(false)
    }
    if (data) {
      setData(data)
    }
  }, [dataEdit, data])

  // validate form with yub
  const schema = yup.object().shape({
    name: yup.string().required(),
    contract_address: yup.string().required(),
    token_standard: yup.string().required(),
    image: yup
      .mixed()
      .nullable()
      .test('fileSize', 'File Size is too large', (value) => {
        const val = value as FileList
        if (!val.length) {
          return true
        }
        return val[0].size < 5242880 ? true : false
      })
      .test('fileType', 'Unsupported File Format', (value) => {
        const val = value as FileList
        if (!val?.length) {
          return true
        }
        return ['image/jpeg', 'image/png', 'image/jpg'].includes(val[0]?.type)
      })
  })

  const form = useForm<Nft>({
    defaultValues: {
      id: Number(id),
      block_chain: '이더리움',
      token_standard: '',
      name: '',
      image: '',
      contract_address: '',
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
    setError
  } = form

  // Set data for form
  const setData = (data: Nft) => {
    setValue('id', data.id)
    setValue('name', data.name)
    setValue('contract_address', data.contract_address)
    setValue('block_chain', data.block_chain)
    setValue('imageName', convertName(data.image))
    setValue('token_standard', data.token_standard)
  }

  // set Error from BE
  useEffect(() => {
    if (errorUpdate) {
      const error: any = errorUpdate
      setError('name', { message: error.message.name[0] })
    }
  }, [errorUpdate])

  // Render option of select
  const menuItem = (item?: any, index?: number): JSX.Element => {
    return (
      <>
        <MenuItem value={item.value}>{item.label}</MenuItem>
      </>
    )
  }

  // Submit form data
  const submitData = (data: Nft) => {
    const formData: FormData = new FormData()

    Object.keys(data).map((key: string) => {
      if (key !== 'image') {
        data[key as keyof Nft] && formData.append(key, data[key as keyof Nft])
      } else {
        data[key]?.length && formData.append(key, data[key][0])
      }
    })
    mutate(formData)
  }

  const viewNft = () => {
    return (
      <>
        <div className={`${style['row-button']}`}>
          <Button
            sx={{ textTransform: 'none', background: '#3f51b5' }}
            variant="contained"
            onClick={() => {
              setStatusEdit(!isStatusEdit)
            }}
          >
            Edit
          </Button>
          <Button
            sx={{
              textTransform: 'none',
              background: '#3f51b5',
              marginLeft: '15px'
            }}
            variant="contained"
          >
            Delete
          </Button>
        </div>
        <div className={`${style['table-layer']}`}>
          <div className={`${style['row-item']}`}>
            <p className={`${style['row-title']}`}>Id</p>
            <p className={`${style['row-content']}`}>{data?.id}</p>
            <p className={`${style['row-title']}`}>Name</p>
            <p className={`${style['row-content']}`}>{data?.name}</p>
          </div>
          <div className={`${style['row-item']}`}>
            <p className={`${style['row-title']}`}>Contract address</p>
            <p className={`${style['row-content']}`}>
              {data?.contract_address}
            </p>
            <p className={`${style['row-title']}`}>Blockchain</p>
            <p className={`${style['row-content']}`}>{data?.block_chain}</p>
          </div>
          <div className={`${style['row-item']}`}>
            <p className={`${style['row-title']}`}>Token Standard</p>
            <p className={`${style['row-content']}`}>{data?.token_standard}</p>
            <p className={`${style['row-title']}`}>Image</p>
            <p className={`${style['row-content']}`}>
              {convertName(data?.image)}
              <Button
                onClick={() => setOpenModal(true)}
                sx={{
                  textTransform: 'none',
                  background: '#3f51b5',
                  marginLeft: '15px'
                }}
                variant="contained"
              >
                See Image
              </Button>
            </p>
          </div>
        </div>
      </>
    )
  }

  const editNftForm = () => {
    return (
      <form
        className={`${style['form-data']}`}
        onSubmit={handleSubmit(submitData)}
      >
        <div className={`${style['row-button']}`}>
          <Button
            type="submit"
            sx={{ textTransform: 'none', background: '#3f51b5' }}
            variant="contained"
          >
            Update
          </Button>
          <Button
            type="button"
            sx={{
              textTransform: 'none',
              background: '#3f51b5',
              marginLeft: '15px'
            }}
            variant="contained"
          >
            Delete
          </Button>
        </div>
        <div className={style['table-layer']}>
          <div className={`${style['row-item']}`}>
            <p className={`${style['row-title']}`}>Id</p>
            <p className={`${style['row-content']}`}>{data?.id}</p>
            <p className={`${style['row-title']}`}>Name</p>
            <span className={`${style['row-content']}`}>
              <Inputs
                width={'100%'}
                register={register}
                name="name"
                control={control}
                helperText={errors.name?.message}
              />
            </span>
          </div>
          <div className={`${style['row-item']}`}>
            <p className={`${style['row-title']}`}>Contract address</p>
            <span className={`${style['row-content']}`}>
              <Inputs
                width={'100%'}
                register={register}
                name="contract_address"
                control={control}
              />
            </span>
            <p className={`${style['row-title']}`}>Blockchain</p>
            <p className={`${style['row-content']}`}>{data?.block_chain}</p>
          </div>
          <div className={`${style['row-item']}`}>
            <p className={`${style['row-title']}`}>Token Standard</p>
            <span className={`${style['row-content']}`}>
              <Select
                option={optionSearch}
                register={register}
                name="token_standard"
                control={control}
              />
            </span>
            <p className={`${style['row-title']}`}>Image</p>
            <span className={`${style['row-content']}`}>
              <Inputs
                inputRef={inputUpload}
                type="file"
                register={register}
                name="image"
                hidden
                control={control}
                onChangeHandle={(file: FileList) => {
                  setValue('imageName', file[0]?.name)
                  trigger('image')
                }}
              />
              <Inputs
                sx={{ paddingRight: '10px' }}
                register={register}
                name="imageName"
                width={'calc(100% - 100px)'}
                control={control}
                disabled
                helperText={errors.image?.message}
              />
              <Button
                onClick={() => {
                  inputUpload.current && inputUpload.current.click()
                }}
                sx={{
                  textTransform: 'none',
                  background: '#3f51b5',
                  padding: '13px 20px'
                }}
                variant="contained"
              >
                Upload
              </Button>
            </span>
          </div>
        </div>
      </form>
    )
  }

  return (
    <div className={`${style['row-nft']}`}>
      <PreviewImage
        open={openModal}
        imageUrl={data && data.image}
        onClose={() => setOpenModal(false)}
      />
      {(isLoading || isLoadingEdit) && <Loading />}
      {!isStatusEdit && viewNft()}
      {isStatusEdit && editNftForm()}
    </div>
  )
}
export default NftDetail
