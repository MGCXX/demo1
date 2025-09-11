import {get} from "@/utils/http"

enum Api{
    url="/document"
}

function getDocument(){
    return get(Api.url)
}

export {getDocument}