
import styleLogin from './sidebar.module.scss';
import { connect } from 'react-redux';

const Sidebar = (props: any) => {

    return (
        <div className={`${styleLogin['item-sidebar']}`}>
            Side Bar
        </div>
    )
}

const mapStateToProps = (state: any) => { 
    return {  
        state: state,
    }; 
};
export default connect(mapStateToProps)(Sidebar);
