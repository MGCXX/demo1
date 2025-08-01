import * as echarts from 'echarts';
import {ref,markRaw, onMounted,onBeforeUnmount} from "vue"
import type { Ref } from "vue"

export  const useChart=(chartRef:Ref<HTMLElement|null>,options:any)=>{
    const chartInstance=ref<echarts.ECharts|null>(null)

    const initCharts=async ()=>{
        if(chartRef.value){
            chartInstance.value = markRaw(echarts.init(chartRef.value))
            const myOption = await options
            chartInstance.value.setOption(myOption)
        }
    }

    const resizeChart=()=>{
        chartInstance.value?.resize()
    }

    onMounted(()=>{
        initCharts()
        window.addEventListener("resize",resizeChart)
    })

    onBeforeUnmount(()=>{
        window.removeEventListener("resize",resizeChart)
        chartInstance.value?.dispose()

    })
}