import style from './spagination.module.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Paginations = (props: any) => {
    return (
        <Stack spacing={2}>
            <Pagination
                count={props.totalPages ? props.totalPages : 0}
                onChange={(event: any, page) => {
                    props.emitPage(page)
                    // return true;
                }}
                renderItem={(item) => (
                <PaginationItem
                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                    {...item}
                />
                )}
            />
        </Stack>
    )
}   
export default Paginations
