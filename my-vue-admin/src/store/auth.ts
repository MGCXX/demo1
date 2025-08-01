import { defineStore } from "pinia";
import { loginApi } from "@/api/user";
interface LoginParams {
    username: string;
    password: string
}

export const useUserStore=defineStore("user",{
    state:()=>({
        token:sessionStorage.getItem("token")||"",
        roles:sessionStorage.getItem("roles")?JSON.parse(sessionStorage.getItem("roles")!):[],
        username:sessionStorage.getItem("username")||"",
        menu:sessionStorage.getItem("menu")?JSON.parse(sessionStorage.getItem("menu")!):[],
    }),
    actions:{
        async login(data:LoginParams,router:any){
            try{
                const res = await loginApi(data);
                console.log("API响应数据:", res.data.data);
                    const { token, user: { username, roles }, menulist } = res.data;
                    this.token = token;
                    this.roles = roles;
                    this.username = username;
                    this.menu = menulist;
                    sessionStorage.setItem("token", token);
                    sessionStorage.setItem("roles", JSON.stringify(roles));
                    sessionStorage.setItem("username", username);
                    sessionStorage.setItem("menu", JSON.stringify(menulist));
                    router.push("/")
        }catch(error){
            console.error(error)
        }
      },
      logout(){
        this.token=""
            this.roles=[];
            this.username=""
            this.menu=[];
            sessionStorage.clear()
      }
    }
})
