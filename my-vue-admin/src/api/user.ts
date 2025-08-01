import {post} from "@/utils/http"
interface LoginParams {
    username: string;
    password: string
}
enum Api{
    Login="/login",
}
export function loginApi(data:LoginParams):Promise<any>{
    return post(Api.Login,data)

}