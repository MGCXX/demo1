import {get} from "@/utils/http"

enum API{
    url1="/chartData1",
    url2="/chartData2",
    url3="/chartData3",
}

function chartData1(){
    return get(API.url1)
}
function chartData2(){
    return get(API.url2)
}
function chartData3(){
    return get(API.url3)
}

export {chartData1,chartData2,chartData3} 