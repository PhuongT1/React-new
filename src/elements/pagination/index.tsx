import style from "./spagination.module.scss"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import { PaginationItem } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
interface PaginationsProps {
  totalPages?: number
  emitPage: (page: number) => void
}

const Paginations = (props: PaginationsProps) => {
  const { totalPages, emitPage } = props
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages ? totalPages : 0}
        onChange={(_event: any, page) => emitPage(page)}
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
