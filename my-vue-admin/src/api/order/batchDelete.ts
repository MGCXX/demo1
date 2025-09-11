import {post} from "@/utils/http"

enum Api{
    url="/batchDelete"
}

function batchDelete(order:any){
    return post(Api.url,{order})
}

export {batchDelete}