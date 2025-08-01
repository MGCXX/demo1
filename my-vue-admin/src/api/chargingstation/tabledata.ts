import {post, get} from "@/utils/http"

enum Api{
    TableData="/stationList",
    Edit="/station/edit",
    Delete="/station/delete",
    Chart="/revenueChart",
    Revenue="/revenueList",
    currentList="/currentList",
}

function getTableData(data:any){
    return post(Api.TableData,data)
}

function editStation(data:any){
    return post(Api.Edit,data)
}

function deleteStation(data:any){
    return post(Api.Delete,data)
}



function getRevenueChart(){
    return get(Api.Chart)
}

function getRevenueList(data:any){
    return post(Api.Revenue,data)
}

function getcurrentList(){
    return post(Api.currentList)
}


export {getTableData,editStation,deleteStation,getRevenueChart,getRevenueList,getcurrentList}