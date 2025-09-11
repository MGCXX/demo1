import { defineStore } from "pinia";
import {ref} from "vue"

interface OrderData {
    orderNo: string;
    equipmentNo: string;
    date: string;
    startTime: string;
    endTime: string;
    money: string;
    pay: string;
    status: string;
  }

export const useTabDetail=defineStore("tabDetail",()=>{
    const getRowData=sessionStorage.getItem("setRowData")
    const rowData=ref<OrderData>(getRowData?JSON.parse(getRowData):{
        orderNo:"",
        equipmentNo:"",
        date:"",
        startTime:"",
        endTime:"",
        money:sessionStorage.getItem("money")?JSON.parse(sessionStorage.getItem("money")!):"",
        pay:"",
        status:""
    })

    const setRowData=(row:any)=>{
        rowData.value=row
        sessionStorage.setItem("setRowData",JSON.stringify(row))
    }

    return {rowData,setRowData}
})