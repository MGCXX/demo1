import { post } from "@/utils/http"
import { ref } from "vue"

export function useTable(url:string,params:any){
    const tableData=ref([])
    const loading=ref(false)
    const pageInfo=ref({
        page:1,
        pageSize:10
    })
    const totals=ref(0)
    const loadData=async ()=>{
        loading.value=true
        try{
            const {data:{list,total}}=await post(url,{...params,...pageInfo.value})
            tableData.value = list
            totals.value=total
        }catch(error){
            console.error(error)
        }finally{
            loading.value=false
        }
       
       
    }
    loadData()

    const handleSizeChange = (page: number) => {
        pageInfo.value.pageSize = page
        pageInfo.value.page = 1
        loadData()
    }

    const handleCurrentChange = (CurrentPage: number) => {
        pageInfo.value.page = CurrentPage
        loadData()
    }

    return{
        tableData,
        loading,
        pageInfo,
        totals,
        loadData,
        handleSizeChange,
        handleCurrentChange
    }
}