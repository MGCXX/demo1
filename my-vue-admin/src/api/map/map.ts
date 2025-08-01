import {post} from "@/utils/http"

enum Api{
    url="/mapList"
}

function getMapList(){
    return post(Api.url)
}

export {getMapList}