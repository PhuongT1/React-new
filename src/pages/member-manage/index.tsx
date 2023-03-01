
import styleLogin from './member-manage.module.scss';
import http from '../../services/axios';
import { useEffect, useRef, useState } from 'react';
import SearchItem from '../../elements/search'
import TableData from '../../elements/table'
import Button from '@mui/material/Button';
import Loading from '../../elements/loading';
import { MenuItem } from '@mui/material';

const MemberManages = () => {
    const [listMember, setlistMember] = useState<any>([])
    const [showLoading, setshowLoading] = useState<boolean>(true)
    const [optionSearch, setoptionSearch] = useState<any>([
        { value1: 'search_like', label1: 'Search Like' }, 
        { value1: 'name_like', label1: 'Name Like' }
    ])
    const paramUrl = {
        per_page: 15,
        page: 1,
        order_by: `id desc`
    }

    useEffect(() => {
        const data = optionSearch.map((ele: any) => {
            return { value: ele.value1, label: ele.label1 }
        })
        setoptionSearch(data)
        fetchData(paramUrl)
    }, [])

    

    const fetchData = async (param: {}) => {
        try {
            const response = await http.get(`/admin/users`, { params: param })
            setlistMember(response.data)
            setshowLoading(false);

        } catch (error: any) {
            setshowLoading(false);
            console.log('Error', error);
        }
    }

    const rowTable = (item?: any, index?: number): JSX.Element => {
        return (
            <>
                <td>{item.id}</td>
                <td>{item.provider}</td>
                <td>{item.name}</td>
                <td>{item?.created_at}</td>
                <td>{item.status === 1 ? '활동' : '휴면' }</td>
                <td>
                    <Button style={{background: "#3f51b5"}} variant="contained">조회</Button>
                </td>
            </>
        )
    }

    const searchData = (data: any) => {
        let dataSearch = {
            created_at_btw: `${data.startDay?.format('DD-MM-YYYY')}, ${data.endDay?.format('DD-MM-YYYY')} 23:59:59`
        }
        fetchData({...paramUrl, ...dataSearch})
    }

    const dataheader: any[] = ['STT', 'Subscription path', 'Name', 'Date Create', 'Status', 'More information']

    return (
        <div className={styleLogin['layer-item']}>
            <div className={`${styleLogin['layer-content']}`}>
                <SearchItem optionSelect={optionSearch} emitDataSearch= {searchData}/>
                <div className={`${styleLogin['layer-table']}`}>
                    { showLoading && (<Loading />) }
                    <TableData dataheader={dataheader} rowItem={rowTable} data={listMember}/>
                </div>
            </div>
        </div>
    )
}

// const mapStateToProps = (state: any) => { 
//     return {  
//         state: state,
//     }; 
// };
// export default connect(mapStateToProps)(MemberManages);
export default MemberManages;
