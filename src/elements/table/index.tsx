import style from './table.module.scss';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { listTable } from './table.type';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const TableData = <T,>(props: listTable<T>) => {
    const [dataList, setdataList] = useState<T[]>([])
    const [dataheader, setdataheader] = useState<string[]>([])
    useEffect(() => {
        setdataList(props.data)
        setdataheader(props.dataheader)
    },[props])
    
    return (
        <>
            {/* <div className={`${style['table-wrapper']}`}>
            <table className={`${style['table-inside']} ${style['table-fix-header']} ${style['text-center']}`}>
                <thead>
                    <tr>
                        { dataheader?.map((item: string, index: number) => <th key={index}>{item}</th>) }
                    </tr>
                </thead>
                <tbody>
                    {
                        dataList?.map((item: T, index: number) =>(
                            <tr key={index}>
                                {props.rowItem(item)}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div> */}
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {
                            dataheader?.map((item: string, index: number) => { 
                                return <TableCell align="center" key={index}>{item}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataList.map((item: any, index: number) => (
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {props.rowItem && props.rowItem(item)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}

const mapStateToProps = (state: any) => { 
    return {  
        state: state,
    }; 
};
export default connect(mapStateToProps)(TableData);
