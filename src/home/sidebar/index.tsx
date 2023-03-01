
import style from './sidebar.module.scss';
import { connect } from 'react-redux';
import { MenuItem, MenuList, Paper} from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = (props: any) => {

    return (
        <div className={`${style['item-sidebar']}`}>
            <Paper sx={{ width: 320, maxWidth: '100%' }}>
                <MenuList>
                    <MenuItem>
                        <Link className={`${style['menu-item']}`} to="/admin/member-manage">Menu 1</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link className={`${style['menu-item']}`} to="">Menu 3</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link className={`${style['menu-item']}`} to="">Menu 3</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link className={`${style['menu-item']}`} to="">Menu 4</Link>
                    </MenuItem>
                </MenuList>
            </Paper>
        </div>
    )
}

const mapStateToProps = (state: any) => { 
    return {  
        state: state,
    }; 
};
export default connect(mapStateToProps)(Sidebar);
