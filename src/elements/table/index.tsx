import style from './table.module.scss';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { dataTable } from './table.type';

const TableData = <T,>(props: dataTable<T>) => {
    const [dataList, setdataList] = useState<T[]>([])
    const [dataheader, setdataheader] = useState<string[]>([])
    useEffect(() => {
        setdataList(props.data)
        setdataheader(props.dataheader)
    },[props])
    
    return (
        <div className={`${style['table-wrapper']}`}>
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
        </div>
    )
}

const mapStateToProps = (state: any) => { 
    return {  
        state: state,
    }; 
};
export default connect(mapStateToProps)(TableData);
