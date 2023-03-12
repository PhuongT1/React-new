import style from "./search.module.scss";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import DatePickers from "../../elements/datePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Select from "../select";
import Inputs from "../Input";
import { MenuItem } from "@mui/material";
import moment from "moment";
import { searchForm } from "models/search.type";

// Model of search props
export interface Search {
  defaultSelect: string;
  optionSelect: any[];
  emitDataSearch: (value: searchForm) => void;
}

const Search = (props: Search) => {
  const { defaultSelect, optionSelect, emitDataSearch } = props;

  const schema = yup.object().shape({
    startDay: yup
      .date()
      .test("startDay", "End day less start day", (value?: Date) =>
        dayValidator(value)
      ),
    endDay: yup
      .date()
      .test("endDay", "End day less start day", (value?: Date) =>
        dayValidator(value)
      ),
  });

  const dayValidator = (value?: Date): boolean => {
    if (!getValues().startDay || !getValues().endDay) return true;
    const start = moment(getValues().startDay?.format("YYYY-MM-DD"));
    const end = moment(getValues().endDay?.format("YYYY-MM-DD"));
    const cal = end.diff(start, "day") > 0;
    console.log("errors", errors);
    if (cal) {
      clearErrors("endDay");
      clearErrors("startDay");
    }
    return cal ? true : false;
  };

  const form = useForm<searchForm>({
    defaultValues: {
      startDay: "",
      order_by: defaultSelect ? defaultSelect : "",
      endDay: "",
      search_like: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const {
    register,
    control,
    // handleSubmit,
    formState: { errors },
    clearErrors,
    getValues,
  } = form;

  const menuItem = (item?: any, index?: number): JSX.Element => {
    return (
      <>
        <MenuItem value={item.value}>{item.label}</MenuItem>
      </>
    );
  };

  return (
    <div className={style["layer-item"]}>
      <form>
        <div className={style["label-item"]}>Day</div>
        <div className={style["layer-datepicker"]}>
          <DatePickers
            width={"160px"}
            helperText={errors.startDay?.message}
            label="시작일"
            inputFormat="DD-MM-YYYY"
            register={register}
            name="startDay"
            control={control}
          />
        </div>
        <div className={style["label-item"]}>~</div>
        <div className={style["layer-datepicker"]}>
          <DatePickers
            width={"160px"}
            helperText={errors.endDay?.message}
            label="시작일"
            inputFormat="DD-MM-YYYY"
            register={register}
            name="endDay"
            control={control}
          />
        </div>
        <div className={style["label-item"]}>Search Classification</div>
        <div className={style["search-item"]}>
          <Select
            option={optionSelect}
            menuItem={menuItem}
            label="Choose a option"
            width={"175px"}
            register={register}
            name="order_by"
            control={control}
          />
          <Inputs
            label="Search"
            helperText=""
            register={register}
            name="search_like"
            control={control}
          />
        </div>
        <div className={style["btn-search"]}>
          <Button
            sx={{ textTransform: "none" }}
            variant="contained"
            onClick={() => emitDataSearch(getValues())}
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};
export default connect(mapStateToProps)(Search);
