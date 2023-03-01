import style from './table.module.scss';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { string } from 'yup';

const TableData = (props: any) => {
    const [dataList, setdataList] = useState<any>(props.data)
    const [dataheader, setdataheader] = useState<any>(props.data)
    useEffect(() => {
        setdataList(props.data)
        setdataheader(props.dataheader)
    },[props])
    return (
        <div className={`${style['table-wrapper']}`}>
            <table className={`${style['table-inside']} ${style['table-fix-header']} ${style['text-center']}`}>
                <thead>
                    <tr>
                        { dataheader?.map((item: any, index: number) => <th key={index}>{item}</th>) }
                    </tr>
                </thead>
                <tbody>
                    {
                        dataList?.map((item: any, index: number) =>(
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

let a=  ['phuong1']

const mapStateToProps = (state: any) => { 
    return {  
        state: state,
    }; 
};
export default connect(mapStateToProps)(TableData);
