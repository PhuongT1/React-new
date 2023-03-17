import { Mission } from "./mission.type"

export interface Quest {
    id: number
    name: string
    verification_code: any
    contract_address: string
    token_standard: string
    block_chain: string
    image: string
    created_at: string
    updated_at: string
    deleted_at: any
    created_by: number
    updated_by: number
    deleted_by: any
    missions: Mission[]
    history_missions: any[]
  }
  
