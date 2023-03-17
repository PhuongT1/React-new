import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Nft } from "models/nft.type";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import http from "services/axios";
import style from "./monthly-quest.module.scss";
import * as yup from "yup";
import Inputs from "elements/Input";
import Select from "elements/select";
import Loading from "elements/loading";
import { Page } from "types/page.types";
import { Mission, Missions } from "models/mission.type";
import { watch } from "fs";
import { getValue } from "@mui/system";

const MonthlyQuest = () => {
  const { id } = useParams();

  const rowheader: string[] = [
    "STT",
    "Subscription path",
    "Name",
    "Date Create",
    "Status",
    "More information",
  ];

  const getList = async ({ queryKey }: { queryKey: [string, number] }) => {
    const [_, id] = queryKey;
    const response = await http.get(`admin/missions/nft/${id}`);
    return { data: response.data } as Page<Mission>;
  };

  const updateNft = async (data: Mission | Omit<Mission, 'id'>) => {
    const response = await http.post<Nft>(`/admin/mission/${data.idTmp}`, data);
    return response.data;
  };

  // useQuery in order to cache data
  const { data, isLoading } = useQuery(
    ["missions-detail", Number(id)],
    getList,
    {
      refetchOnWindowFocus: false,
    }
  );

  // useMutation to cache data and post data to server
  const queryClient = useQueryClient();

  const {
    data: dataEdit,
    isLoading: isLoadingEdit,
    error: errorUpdate,
    mutate,
  } = useMutation(updateNft);

  // validate form with yub
  const schema = yup.object().shape({});

  const form = useForm<Missions>({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const {
    register,
    control,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = form;

  const { append, fields, update } = useFieldArray({
    control,
    name: "mission",
  })

  useEffect(() => {
    if (data) {
      data.data.map((item) => append({ ...item, statusEdit: false, idTmp: item.id }))
    }
  }, [data])

  const viewQuest = (quest: Mission, index: number) => {
    return (
      <>
        <div key={index} className={`${style["row-content"]}`}>
          <span>{quest.id}</span>
          <span>{quest.type}</span>
          <span>{quest.description}</span>
          <span>{quest.image}</span>
          <span>
            <Button
              onClick={() => {
                update(index, { ...quest, statusEdit: true})
              }}
              sx={{
                textTransform: "none",
                background: "#3f51b5",
                marginRight: "10px",
              }}
              variant="contained"
            >
              Edit
            </Button>
            <Button
              sx={{
                textTransform: "none",
                background: "#3f51b5",
              }}
              variant="contained"
            >
              Delete
            </Button>
          </span>
        </div>
      </>
    );
  };
  const editQuest = (quest: Mission, index: number) => {
    return (
      <>
        <div key={index} className={`${style["row-content"]}`}>
          <span>{quest.id}</span>
          <span>{quest.type}</span>
          <span>
            <Inputs
              sx={{ paddingRight: "10px" }}
              register={register}
              name={`mission.${index}.description`}
              width={"100%"}
              control={control}
            />
          </span>
          <span>{quest.image}</span>
          <span>
            <Button
                onClick={() => {
                    const {id, ...rest} = getValues().mission[index]
                    console.log('item quest', rest)
                    mutate(rest)
                }}
              sx={{
                textTransform: "none",
                background: "#3f51b5",
                marginRight: "10px",
              }}
              variant="contained"
            >
              Complete
            </Button>
            <Button
              sx={{
                textTransform: "none",
                background: "#3f51b5",
              }}
              variant="contained"
            >
              Delete
            </Button>
          </span>
        </div>
      </>
    );
  };

  return (
    <div className={`${style["row-monthly"]}`}>
      {(isLoading || isLoadingEdit) && <Loading />}
      <h3>Monthly quest</h3>
      <form>
        <div className={`${style["table-content"]}`}>
          <div className={`${style["row-content"]}`}>
            <span>Quest number</span>
            <span>Quest type</span>
            <span>Quest Content</span>
            <span>Quest image</span>
            <span>Management</span>
          </div>
          {fields &&
            fields.map((quest: Mission, index) => {
              return (
                <div key={index}>
                  {quest.statusEdit
                    ? editQuest(quest, index)
                    : viewQuest(quest, index)}
                </div>
              );
            })}
        </div>
      </form>
    </div>
  );
};
export default MonthlyQuest;
