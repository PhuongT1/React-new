import { yupResolver } from '@hookform/resolvers/yup'
import { Button, MenuItem } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Nft } from 'models/nft.type'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import http from 'services/axios'
import style from './monthly-quest.module.scss'
import * as yup from 'yup'
import Inputs from 'elements/Input'
import Loading from 'elements/loading'
import { Page } from 'types/page.types'
import { Mission, Missions } from 'models/mission.type'
import { convertName } from 'services/common.service'
import PreviewImage from 'dialog/preview-image'
import Select from 'elements/select'

const MonthlyQuest = () => {
  const { id } = useParams()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>('')
  const inputFiles = useRef<any>([])
  const optionSearch = [
    { value: 1, label: 'ERC-721' },
    { value: 2, label: 'ERC-1155' }
  ]

  // Render option of select
  const menuItem = (item?: any, index?: number): JSX.Element => {
    return (
      <>
        <MenuItem value={item.value}>{item.label}</MenuItem>
      </>
    )
  }

  const getList = async ({ queryKey }: { queryKey: [string, number] }) => {
    const [_, id] = queryKey
    const response = await http.get(`admin/missions/nft/${id}`)
    return { data: response.data } as Page<Mission>
  }

  const updateNft = async (data: Mission | Omit<Mission, 'id'>) => {
    const response = await http.post<Nft>(`/admin/mission/${data.idTmp}`, data)
    return response.data
  }

  const addMissionAPI = async (data: Omit<Mission, 'id'>) => {
    const response = await http.post<Nft>(`admin/missions/nft/${id}`, data)
    return response.data
  }

  // useQuery in order to cache data
  const { data, isLoading } = useQuery(
    ['admin/missions/nft', Number(id)],
    getList,
    {
      refetchOnWindowFocus: false
    }
  )

  // useMutation to cache data and post data to server
  const queryClient = useQueryClient()

  const {
    data: dataEdit,
    isLoading: isLoadingEdit,
    error: errorUpdate,
    mutateAsync
  } = useMutation(updateNft, {
    onSuccess: (dataEdit) => {
      dataEdit.nft_id = Number(dataEdit.nft_id)
      dataEdit.type = Number(dataEdit.type)
      const dataCache = queryClient.getQueryData([
        'admin/missions/nft',
        Number(id)
      ]) as Page<Mission>
      const index = dataCache.data.findIndex((item) => item.id == dataEdit.id) // find index
      dataCache.data[index] = dataEdit // overrise data

      // Update cache
      queryClient.setQueryData(['admin/missions/nft', Number(id)], {
        data: [...dataCache.data]
      })
    }
  })

  const {
    data: dataAdd,
    error: errorAdd,
    mutateAsync: mutateAddAsync
  } = useMutation(addMissionAPI, {
    onSuccess: (dataEdit) => {}
  })

  // validate form with yub
  const schema = yup.object().shape({
    missions: yup.array().of(
      yup.object().shape({
        description: yup.string().required('Please input a type')
      })
    )
  })

  const form = useForm<Missions>({
    defaultValues: {
      missions: []
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
    setError,
    getValues
  } = form

  const { append, fields, update, remove } = useFieldArray({
    control,
    name: 'missions'
  })

  useEffect(() => {
    if (data) {
      remove()
      data.data &&
        data.data.map((item) =>
          append({
            ...item,
            statusEdit: false,
            idTmp: item.id,
            imageName: item.image
          })
        )
    }
  }, [data])

  const addMission = () => {
    append(
      {
        description: '',
        image: '',
        imageName: '',
        created_at: '',
        updated_at: '',
        deleted_at: null,
        created_by: 0,
        updated_by: 0,
        deleted_by: null,
        statusEdit: false,
        statusAdd: true
      },
      { shouldFocus: false }
    )
  }

  const viewQuest = (quest: Mission, index: number) => {
    return (
      <>
        <div className={`${style['row-content']}`}>
          <span>{quest.idTmp}</span>
          <span>{optionSearch[(quest.type || 1) - 1]?.label}</span>
          <span>{quest.description}</span>
          <span>
            {convertName(quest.image)}
            <Button
              onClick={() => {
                setOpenModal(true)
                setImageUrl(quest.imageName || '')
              }}
              sx={{
                textTransform: 'none',
                background: '#3f51b5',
                marginLeft: '15px'
              }}
              variant="contained"
            >
              See Image
            </Button>
          </span>
          <span>
            <Button
              onClick={() => {
                update(index, { ...quest, statusEdit: true })
              }}
              sx={{
                textTransform: 'none',
                background: '#3f51b5',
                marginRight: '10px'
              }}
              variant="contained"
            >
              Edit
            </Button>
            <Button
              sx={{
                textTransform: 'none',
                background: '#3f51b5'
              }}
              variant="contained"
            >
              Delete
            </Button>
          </span>
        </div>
      </>
    )
  }

  const editQuest = (quest: Mission, index: number) => {
    return (
      <>
        <div className={`${style['row-content']}`}>
          <span>{quest.idTmp}</span>
          <span>
            <Select
              option={optionSearch}
              menuItem={menuItem}
              register={register}
              name={`missions.${index}.type`}
              control={control}
            />
          </span>
          <span>
            <Inputs
              sx={{ paddingRight: '10px' }}
              register={register}
              name={`missions.${index}.description`}
              width={'100%'}
              control={control}
              helperText={
                errors?.missions &&
                errors?.missions[index]?.description?.message
              }
            />
          </span>
          <span>
            {convertName(quest.imageName || '')}
            <Inputs
              type="file"
              sx={{ paddingRight: '10px' }}
              register={register}
              name={`missions.${index}.image`}
              width={'100%'}
              control={control}
              inputRef={(e: any) => (inputFiles.current[index] = e)}
            />
            <Button
              onClick={() => inputFiles.current[index].click()}
              sx={{
                textTransform: 'none',
                background: '#3f51b5'
              }}
              variant="contained"
            >
              Upload
            </Button>
          </span>
          <span>
            <Button
              onClick={async () => {
                await trigger(`missions.${index}`)
                console.log(
                  'Error',
                  errors?.missions && errors?.missions[index]
                )
                if (
                  Object.keys((errors.missions && errors.missions[index]) || {})
                    .length === 0
                ) {
                  const { id, ...rest } = getValues().missions[index]
                  update(index, {
                    ...getValues().missions[index],
                    statusEdit: false
                  })

                  !rest.statusAdd && mutateAsync(rest)
                  rest.statusAdd && mutateAddAsync(rest)
                }
              }}
              sx={{
                textTransform: 'none',
                background: '#3f51b5',
                marginRight: '10px'
              }}
              variant="contained"
            >
              Complete
            </Button>
            <Button
              sx={{
                textTransform: 'none',
                background: '#3f51b5'
              }}
              variant="contained"
            >
              Delete
            </Button>
          </span>
        </div>
      </>
    )
  }

  // const [count, setCount] = useState(5)
  // useEffect(() => {
  //   const counter = setTimeout(() => {
  //     return setCount((pre) => {
  //       if (pre == 1) clearInterval(counter)
  //       return pre - 1
  //     })
  //   }, 1000)
  // }, [count])

  return (
    <div className={`${style['row-monthly']}`}>
      <PreviewImage
        open={openModal}
        imageUrl={imageUrl}
        onClose={() => setOpenModal(false)}
      />
      {(isLoading || isLoadingEdit) && <Loading />}
      <h3>Monthly quest</h3>
      <form>
        <div className={`${style['table-content']}`}>
          <div className={`${style['row-content']}`}>
            <span>Quest number</span>
            <span>Quest type</span>
            <span>Quest Content</span>
            <span>Quest image</span>
            <span>Management</span>
          </div>
          {fields &&
            fields.map((quest: Mission, index) => {
              return (
                <div key={quest.id}>
                  {quest.statusEdit || quest.statusAdd
                    ? editQuest(quest, index)
                    : viewQuest(quest, index)}
                </div>
              )
            })}
        </div>
      </form>
      <div className={`${style['row-button-add']}`}>
        <Button
          onClick={addMission}
          sx={{
            textTransform: 'none',
            background: '#3f51b5'
          }}
          variant="contained"
        >
          Add Missison
        </Button>
      </div>
    </div>
  )
}
export default MonthlyQuest
