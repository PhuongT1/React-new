
import style from './sidebar.module.scss';
import { connect } from 'react-redux';
import { MenuItem, MenuList, Paper} from '@mui/material';
import { Link, Navigate, NavLink } from 'react-router-dom';
import { MENU as MENUS } from './menu'
import { MenuItem as Menu } from './menu.model';

const Sidebar = (props: any) => {

    return (
        <div className={`${style['item-sidebar']}`}>
            <Paper sx={{ width: 320, maxWidth: '100%' }}>
                <MenuList>
                    { MENUS.map((menu: Menu, index: number) => {
                        return (
                            <NavLink
                                key={index}
                                to={menu.link}
                                className={({ isActive }) => isActive ? `${style['activeMenu']} ${style['menu']}`  : `${style['menu']}`}
                            >
                                <MenuItem className={`${style['menu-item']}`}>
                                    {menu.label}
                                </MenuItem>
                                
                            </NavLink>
                        )
                    }) }  
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
