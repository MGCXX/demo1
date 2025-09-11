import {get} from "@/utils/http"

enum Api{
    url="/alarmList"
}

function getList(){
    return get(Api.url)
}

export {getList}