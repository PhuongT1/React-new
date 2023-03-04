
import styleLogin from './member-manage.module.scss'
import http from '../../services/axios'
import { useEffect, useState } from 'react'
import SearchItem from '../../elements/search'
import TableData from '../../elements/table'
import Button from '@mui/material/Button'
// import Loading from '../../elements/loading'
import Paginations from '../../elements/pagination'
import { Page } from '../../types/page.types'
import { Member, optionSearch } from './member-manage.type'
import moment from 'moment'
import { TableCell } from '@mui/material'
import React from 'react'
const Loading = React.lazy(() => import('../../elements/loading'));

const MemberManages = () => {
    const [listMember, setlistMember] = useState<Page<Member>>({data: [], meta: {}})
    const [showLoading, setshowLoading] = useState<boolean>(true)
    const [optionSearch, setoptionSearch] = useState<optionSearch[]>([
        { value: 'search_like', label: 'Search Like' }, 
        { value: 'name_like', label: 'Name Like' },
        { value: 'id_eq', label: 'Id Like' },
    ])
    const paramUrl = {
        per_page: 5,
        page: 1,
        order_by: `id desc`
    }

    useEffect(() => {
        fetchData(paramUrl)
    }, [])

    

    const fetchData = async (param:any) => {
        try {
            setshowLoading(true);
            const response = await http.get(`/admin/users`, { params: param })
            setlistMember(response)
            setshowLoading(false);

        } catch (error: any) {
            setshowLoading(false);
            console.log('Error', error);
        }
    }

    const rowheader: string[] = [
        'STT',
        'Subscription path',
        'Name',
        'Date Create',
        'Status',
        'More information'
    ]

    const rowTable = (item: Member, index: number): JSX.Element => {
        return (
            <>
                <TableCell align="center">{item.id}</TableCell >
                <TableCell align="center">{item.provider}</TableCell >
                <TableCell align="center">{item.name}</TableCell >
                <TableCell align="center">{moment(item.created_at).format('DD-MM-YYYY')}</TableCell >
                <TableCell align="center">{item.status === 1 ? '활동' : '휴면' }</TableCell >
                <TableCell align="center">
                    <Button style={{background: "#3f51b5"}} variant="contained">조회</Button>
                </TableCell >
            </>
        )
    }

    const searchData = (data: any = {}) => {
        if (!data) return;
        let dataSearch = {} as any;
        dataSearch['created_at_btw'] = `${data.startDay ? data.startDay.format('DD-MM-YYYY'): ''}${data.endDay ? `, ${data.endDay.format('DD-MM-YYYY')} 23:59:59`: ''}`
        dataSearch[data.order_by] = data.search_like
        fetchData({...paramUrl, ...dataSearch})
    }

    

    const emitPage = (page: number) => {
        console.log('emitPage', page);
        fetchData({...paramUrl, ...{ page: page }})
    }
    return (
        <div className={styleLogin['layer-item']}>
            <div className={`${styleLogin['layer-content']}`}>
                <SearchItem defaultSelect='name_like' optionSelect={optionSearch} emitDataSearch= {searchData}/>
                <div className={`${styleLogin['layer-table']}`}>
                    { showLoading && (<Loading />) }
                    <TableData dataheader={rowheader} rowItem={rowTable} data={listMember.data}/>
                </div>
                <div className={`${styleLogin['layer-pagination']}`} >
                    <Paginations totalPages={listMember.meta?.last_page} emitPage={emitPage}/>
                </div>
            </div>
        </div>
    )
}
export default MemberManages;
