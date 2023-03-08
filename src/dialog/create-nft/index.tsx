import styleNft from "./create-nft.module.scss";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
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
    { value: "ERC-721", label: "ERC-721" },
    { value: "ERC-1155", label: "ERC-1155" }
  ])
  
  const schema = yup.object().shape({
    name: yup.string().required(),
    contract_address: yup.string().required(),
    token_standard: yup.string().required(),
    image: yup.string().required(),
  })

  const form = useForm<Nft>({
    defaultValues: { block_chain: "이더리움", token_standard: '' },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = form;

  // Render option of select
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
          <div className={styleNft.layerInput} style={ {marginTop: "17px"} }>이더리움</div>
        </div>
        <div className={`${styleNft["row-item"]}`}>
          <label>Token Standard</label>
          <div className={styleNft.layerInput}>
            <Select
              option={optionSearch}
              menuItem={menuItem}
              register={register}
              name="token_standard"
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
              name="image"
              control={control}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => {
          onClose('phuong modal')
          clearErrors()
        }}>
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
