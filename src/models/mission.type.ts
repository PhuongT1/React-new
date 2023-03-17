export interface Mission {
  id: number;
  idTmp: number;
  nft_id: number;
  type: number;
  description: string;
  image: FileList | any;
  imageName: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  created_by: number;
  updated_by: number;
  deleted_by: any;
  code: any;
  statusEdit : boolean
  statusAdd : boolean
}

export interface Missions {
    mission : Mission[]
}    