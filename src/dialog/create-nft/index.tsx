import styleNft from "./create-nft.module.scss";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import Inputs from "elements/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Nft } from "models/nft.type";
import Select from "elements/select";

export interface NftProps {
  open: boolean;
  onClose: (value: string) => void;
}

const CreateNft = (props: NftProps) => {
  const { onClose, open } = props;
  const [optionSearch, setoptionSearch] = useState<any>([
    { value: "search_like", label: "Search Like" },
    { value: "name_like", label: "Name Like" },
    { value: "id_eq", label: "Id Like" },
  ])
  
  const schema = yup.object().shape({
    name: yup.string().required()
  })

  const form = useForm<Nft>({
    defaultValues: { block_chain: "이더리움" },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = form;

  

  const menuItem = (item?: any, index?: number): JSX.Element => {
    return (
      <>
        <MenuItem value={item.value}>{item.label}</MenuItem>
      </>
    );
  }

  return (
    <Dialog fullWidth={true} maxWidth={"sm"} open={open}>
      <DialogContent>
        <div className={`${styleNft["row-item"]}`}>
          <label>Name</label>
          <div className={styleNft.layerInput}>
            <Inputs
              width={"100%"}
              register={register}
              name="name"
              control={control}
            />
          </div>
        </div>
        <div className={`${styleNft["row-item"]}`}>
          <label>Contract address</label>
          <div className={styleNft.layerInput}>
            <Inputs
              width={"100%"}
              register={register}
              name="contract_address"
              control={control}
            />
          </div>
        </div>
        <div className={`${styleNft["row-item"]}`}>
          <label>Blockchain</label>
          <div className={styleNft.layerInput}>이더리움</div>
        </div>
        <div className={`${styleNft["row-item"]}`}>
          <label>Token Standard</label>
          <div className={styleNft.layerInput}>
            <Select
              option={optionSearch}
              menuItem={menuItem}
              register={register}
              name="order_by"
              control={control}
            />
          </div>
        </div>
        <div className={`${styleNft["row-item"]}`}>
          <label>Image</label>
          <div className={styleNft.layerInput}>
            <Inputs
              width={"100%"}
              register={register}
              name="contract_address"
              control={control}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => onClose('phuong modal')}>
          Cancel
        </Button>
        <Button autoFocus>
          Complete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};
export default CreateNft;
