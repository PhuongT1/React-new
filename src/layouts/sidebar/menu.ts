import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'Member management',
        link: '/admin/member-manage'
    },
    {
        id: 2,
        label: 'NFT management',
        icon: 'bx-shield-quarter',
        link: '/admin/nft-manage',
        subItems: [
            {
                id: 6,
                label: '공지사항 관리',
                link: '/setting/notice-management',
                parentId: 5
            },
            {
                id: 12,
                label: '팝업 관리',
                link: '/setting/popup-management',
                parentId: 5
            }
        ]    
    }
];

