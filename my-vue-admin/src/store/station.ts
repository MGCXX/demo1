import {defineStore} from "pinia"
import {ref} from "vue"
import type {RowType} from "@/type/RowType"

export const useStationStore=defineStore("station",()=>{
    const rowData=ref<RowType>({
        name:"",
        id:"",
        city:"",
        fast:"",
        slow:"",
        status:1,
        now:"",
        fault:"",
        person:"",
        tel:""
    })

    const setRowData=(row:RowType)=>{
        rowData.value=row
    }

    const resetRowData=()=>{
        rowData.value={
            name:"",
            id:"",
            city:"",
            fast:"",
            slow:"",
            status:1,
            now:"",
            fault:"",
            person:"",
            tel:""
        }
    }

    return {rowData,setRowData,resetRowData}
})