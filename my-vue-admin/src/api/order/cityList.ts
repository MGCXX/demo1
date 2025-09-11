import {get} from "@/utils/http"

enum Api{
    url="/cityList"
}

export function cityList(){
    return get(Api.url)
}