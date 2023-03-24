import styleLogin from './member-manage.module.scss'
import http from 'services/axios'
import { useState } from 'react'
import SearchItem from 'elements/search'
import TableData from 'elements/table'
import Button from '@mui/material/Button'
import Paginations from 'elements/pagination'
import { Page } from 'types/page.types'
import { Member, searchPage } from './member-manage.type'
import moment from 'moment'
import { TableCell } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { searchForm } from 'models/search.type'
const Loading = React.lazy(() => import('elements/loading'))

const MemberManages = () => {
  // API Get list data
  const getMemberList = async ({
    queryKey
  }: {
    queryKey: [string, searchPage]
  }) => {
    const [, param] = queryKey
    const response = await http.get<Page<Member>>(`/admin/users`, {
      params: param
    })
    return response.data
  }

  // Param url
  const [paramUrl, setParamUrl] = useState<searchPage>({
    per_page: 5,
    page: 1,
    order_by: 'id desc'
  })

  // useQuery in order to cache data
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['member-manage', paramUrl],
    queryFn: getMemberList
  })

  const optionSearch = [
    { value: 'search_like', label: 'Search Like' },
    { value: 'name_like', label: 'Name Like' },
    { value: 'id_eq', label: 'Id Like' }
  ]

  if (isError) {
    console.log(error) // log error if get data has error
  }

  const rowheader: string[] = [
    'STT',
    'Subscription path',
    'Name',
    'Date Create',
    'Status',
    'More information'
  ]

  // Render UI for row table
  const rowTable = (item: Member, _index?: number) => {
    return (
      <>
        <TableCell align="center">{item.id}</TableCell>
        <TableCell align="center">{item.provider}</TableCell>
        <TableCell align="center">{item.name}</TableCell>
        <TableCell align="center">
          {moment(item.created_at).format('DD-MM-YYYY')}
        </TableCell>
        <TableCell align="center">
          {item.status === 1 ? 'Active' : 'None Active'}
        </TableCell>
        <TableCell align="center">
          <Button
            sx={{
              textTransform: 'none',
              background: '#3f51b5',
              padding: 0
            }}
            variant="contained"
          >
            <NavLink
              style={{
                textDecoration: 'none',
                color: 'white',
                padding: '7px 15px'
              }}
              to={`view-detail/id/${item.id}`}
            >
              Link Detail
            </NavLink>
          </Button>
        </TableCell>
      </>
    )
  }

  const searchData = (data: searchForm) => {
    if (!data) return
    let dataSearch = {} as searchPage
    dataSearch['created_at_btw'] = `${
      data.startDay ? data.startDay?.format('DD-MM-YYYY') : ''
    }${data.endDay ? `, ${data.endDay.format('DD-MM-YYYY')} 23:59:59` : ''}`
    dataSearch[data.order_by as keyof searchForm] = data.search_like
    setParamUrl({ ...paramUrl, ...dataSearch })
  }

  // Patinate for pages
  const emitPage = (page: number) => {
    const paramUrls = { ...paramUrl, page }
    setParamUrl(paramUrls)
  }

  // render UI for Member manage
  return (
    <div className={styleLogin['layer-item']}>
      <div className={`${styleLogin['layer-content']}`}>
        <SearchItem
          defaultSelect="name_like"
          optionSelect={optionSearch}
          emitDataSearch={searchData}
        ></SearchItem>
        <div className={`${styleLogin['layer-table']}`}>
          {isLoading && <Loading />}
          <TableData
            dataheader={rowheader}
            rowItem={rowTable}
            data={data && data.data}
          />
        </div>
        <div className={`${styleLogin['layer-pagination']}`}>
          <Paginations
            totalPages={data?.meta && data.meta.last_page}
            emitPage={emitPage}
          />
        </div>
      </div>
    </div>
  )
}
export default MemberManages
