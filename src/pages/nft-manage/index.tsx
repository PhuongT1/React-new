import styleLogin from "./member-manage.module.scss";
import http from "../../services/axios";
import { useCallback, useEffect, useState } from "react";
import SearchItem from "elements/search";
import TableData from "elements/table";
import Button from "@mui/material/Button";
import Paginations from "elements/pagination";
import { Page } from "../../types/page.types";
import { Nft, optionSearch } from "./member-manage.type";
import { TableCell } from "@mui/material";
import { NavLink } from "react-router-dom";
import Loading from "elements/loading";
import CreateNft from "dialog/create-nft";
import { useQuery } from "@tanstack/react-query";

const NftManage = () => {

  const getList = async ({ queryKey }: any) => {
    const [, param] = queryKey
    const response = await http.get<Page<Nft>>(`/admin/nfts`, { params: param })
    return {
      data: response.data.data, 
      meta: {
        last_page: response.data.last_page
      }
    }
  }

  const [paramUrl, setParamUrl] = useState<any>({
    per_page: 15,
    page: 1,
    order_by: `desc`
  });

  const { data, isFetching, isLoading, error, isError } = useQuery({ 
    queryKey: ['nft-manage', paramUrl],
    queryFn: getList,
    refetchOnWindowFocus: false
  })

  if (isError) {
    console.log(error)
  }

  // set state for open (modal)
  const [open, setOpen] = useState(false);

  const handlOpenModal = () => {
    setOpen(true);
  };

  const handleClose = (value?: string) => {
    setOpen(false);
    console.log("handleClose", value);
  };

  const [optionSearch, setoptionSearch] = useState<optionSearch[]>([
    { value: "search_like", label: "Search Like" },
    { value: "name_like", label: "Name Like" },
    { value: "id_eq", label: "Id Like" },
  ]);

  const searchData = (data: any = {}) => {
    if (!data) return;
    let dataSearch = {} as any;
    dataSearch["created_at_btw"] = `${
      data.startDay ? data.startDay.format("DD-MM-YYYY") : ""
    }${data.endDay ? `, ${data.endDay.format("DD-MM-YYYY")} 23:59:59` : ""}`;
    dataSearch[data.order_by] = data.search_like;
    setParamUrl({ ...paramUrl, ...dataSearch });
  };

  const emitPage = (page: number) => {
    console.log('page', page)
    setParamUrl({ ...paramUrl, ...{ page: page } });
  }

  const rowheader: string[] = [
    "STT",
    "Registration Number",
    "Name",
    "Contract address",
    "Blockchain",
    "Token standard",
    "More information",
  ];

  const rowTable = (item: Nft, index: number): JSX.Element => {
    return (
      <>
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell align="center">{item.id}</TableCell>
        <TableCell align="center">{item.name}</TableCell>
        <TableCell align="center">{item.contract_address}</TableCell>
        <TableCell align="center">{item.block_chain}</TableCell>
        <TableCell align="center">{item.token_standard}</TableCell>
        <TableCell align="center">
          <Button
            sx={{ textTransform: "none", background: "#3f51b5", padding: 0 }}
            variant="contained"
          >
            <NavLink
              style={{
                textDecoration: "none",
                color: "white",
                padding: "7px 15px",
              }}
              to={`view-detail/id/${item.id}`}
            >
              Link Detail
            </NavLink>
          </Button>
        </TableCell>
      </>
    );
  };

  // Render UI
  return (
    <div className={styleLogin["layer-item"]}>
      <CreateNft open={open} onClose={handleClose} />
      <div className={`${styleLogin["layer-content"]}`}>
        <SearchItem
          defaultSelect="name_like"
          optionSelect={optionSearch}
          emitDataSearch={searchData}
        />
        <div className={`${styleLogin["layer-table"]}`}>
          {isFetching && <Loading />}
          <TableData
            dataheader={rowheader}
            rowItem={rowTable}
            data={data?.data}
          />
        </div>
        <div className={`${styleLogin["layer-register"]}`}>
          <Button
            onClick={() => handlOpenModal()}
            sx={{ textTransform: "none", background: "#3f51b5" }}
            variant="contained"
          >
            Register NFT
          </Button>
        </div>
        <div className={`${styleLogin["layer-pagination"]}`}>
          <Paginations
            totalPages={data?.meta?.last_page || 0}
            emitPage={emitPage}
          />
        </div>
      </div>
    </div>
  )
}
export default NftManage;
