import {post} from "@/utils/http"

enum Api{
    url="/permissionList",
    userAuth="/userAuth",
    setAuth="/setAuth"
}

function getList(data:any){
    return post(Api.url,data)
}
function userAuth(pageAuthority:string){
    return post(Api.userAuth,{pageAuthority})
}

function setAuth(btnList:string[],pageList:string,account:string[]){
    return post(Api.setAuth,{btnList,pageList,account})
}
export {getList,userAuth,setAuth}