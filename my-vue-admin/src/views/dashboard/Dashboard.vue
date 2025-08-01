<template>
    <el-row :gutter="20">
        <el-col :span="18">
            <el-card>
                <div class="title">
                    <h1>今日设备运行状态</h1>
                    <p class="ml">更新时间:2024年8月31日</p>
                    <el-icon color="#86909c">
                        <Refresh />
                    </el-icon>
                </div>
                <div class="equipment">
                    <div class="statistic-card">
                        <h4 class="mt mb">充电桩使用率</h4>
                        <img :src="flash" class="mt mb">
                        <h1 class="mt mb">2263 / 3398</h1>
                        <el-statistic :value="9">
                            <template #title>
                                <div style="display: inline-flex; align-items: center" class="mt mb">
                                    异常设备
                                    <el-tooltip effect="dark" content="当前有9台设备异常，请尽快处理" placement="top">
                                        <el-icon style="margin-left: 4px" :size="12">
                                            <Warning />
                                        </el-icon>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-statistic>
                        <div class="statistic-footer">
                            <div class="footer-item">
                                <span>相较于昨日</span>
                                <span class="green">
                                    24%
                                    <el-icon>
                                        <CaretTop />
                                    </el-icon>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="statistic-card">
                        <h4 class="mt mb">充电桩使用率</h4>
                        <img :src="flash2" class="mt mb">
                        <h1 class="mt mb">2263 / 3398</h1>
                        <el-statistic :value="9">
                            <template #title>
                                <div style="display: inline-flex; align-items: center" class="mt mb">
                                    异常设备
                                    <el-tooltip effect="dark" content="当前有9台设备异常，请尽快处理" placement="top">
                                        <el-icon style="margin-left: 4px" :size="12">
                                            <Warning />
                                        </el-icon>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-statistic>
                        <div class="statistic-footer">
                            <div class="footer-item">
                                <span>相较于昨日</span>
                                <span class="green">
                                    24%
                                    <el-icon>
                                        <CaretTop color="red" />
                                    </el-icon>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="statistic-card">
                        <h4 class="mt mb">充电桩使用率</h4>
                        <img :src="flash3" class="mt mb">
                        <h1 class="mt mb">2263 / 3398</h1>
                        <el-statistic :value="9">
                            <template #title>
                                <div style="display: inline-flex; align-items: center" class="mt mb">
                                    异常设备
                                    <el-tooltip effect="dark" content="当前有9台设备异常，请尽快处理" placement="top">
                                        <el-icon style="margin-left: 4px" :size="12">
                                            <Warning />
                                        </el-icon>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-statistic>
                        <div class="statistic-footer">
                            <div class="footer-item">
                                <span>相较于昨日</span>
                                <span class="green">
                                    24%
                                    <el-icon>
                                        <CaretTop color="green" />
                                    </el-icon>
                                </span>
                            </div>
                        </div>
                    </div>


                </div>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <h1>常用功能</h1>
                </template>
                <el-row :gutter="24" style="text-align: center">
                    <el-col :span="6" @click="handle('订单管理', '/operations/orders', 'DocumentCopy')">
                        <img :src="progress" />
                        <p>任务进度</p>
                    </el-col>
                    <el-col :span="6" @click="handle('设备维修', '/alarm', 'Phone')">
                        <img :src="repair" />
                        <p>设备维修</p>
                    </el-col>
                    <el-col :span="6" @click="handle('营收占比', '/operations/total', 'Files')">
                        <img :src="total" />
                        <p>营收占比</p>
                    </el-col>
                    <el-col :span="6" @click="handle('营收统计', '/operations/orders', 'DataAnalysis')">
                        <img :src="money" />
                        <p>营收统计</p>
                    </el-col>
                </el-row>
            </el-card>

            <el-card class="mt">
                <template #header>
                    <h1>能源统计</h1>
                </template>
                <el-row>
                    <el-col :span="6">
                        <div ref="myChart1" style="width: 100%;height: 400px;"></div>
                    </el-col>
                    <el-col :span="18">
                        <div ref="myChart2" style="width: 100%;height: 400px;"></div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card :gutter="24">
                <template #header>
                    <h1>设备总览</h1>
                </template>
                <div ref="myChart3" style="width:100%;height: 240px;"></div>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <h1>营收统计表</h1>
                </template>
                <ul>
                    <li class="item">
                        <div>
                            <span class="radius">1</span>
                            <span class="area ml">广州</span>
                        </div>
                        <span style="color:#666">52,457</span>
                        <span>
                            24%
                            <el-icon>
                                <CaretTop />
                            </el-icon>
                        </span>
                    </li>
                    <li class="item" style="background-color: #fdf6ec;">
                        <div>
                            <span class="radius">1</span>
                            <span class="area ml">广州</span>
                        </div>
                        <span style="color:#666">52,457</span>
                        <span>
                            24%
                            <el-icon>
                                <CaretTop />
                            </el-icon>
                        </span>
                    </li>
                </ul>
            </el-card>
        </el-col>
    </el-row>

</template>

<script setup lang="ts">
import flash from "@/assets/flash.png"
import flash2 from "@/assets/flash2.png"
import flash3 from "@/assets/flash3.png"
import progress from "@/assets/progress.png"
import repair from "@/assets/repair.png"
import total from "@/assets/total.png"
import money from "@/assets/money.png"
import { useTagsStore } from "@/store/tags"
import { useRouter } from "vue-router"
import { reactive, ref } from "vue"
import { chartData1, chartData2, chartData3 } from "@/api/dashboard/chartData.ts"
import { useChart } from "@/hook/useChart"
const myChart1 = ref(null)
const myChart2 = ref(null)
const myChart3 = ref(null)
const router = useRouter()
const tagsStore = useTagsStore()
const { addTags, setCurrentTab } = tagsStore
const handle = (name: string, url: string, icon: string) => {
    addTags(name, url, icon)
    setCurrentTab(name, url)
    router.push(url)
}

const getChartdata1 = async () => {
    const chartOption1: any = reactive({
        legend: {
            top: 'bottom'
        },
        tooltip: {
            trigger: "item",
            formatter: '{a}<br/>{b}:{c}'
        },
        series: [
            {
                name: '营收占比',
                type: 'pie',
                radius: ["50%", "70%"],
                center: ['50%', '50%'],
                roseType: "area",
                emphasis: {
                    label: {
                        show: true,
                        fontSize: "16",
                        fontWeight: "bold"
                    }
                },
                data: [],
            }
        ],
        graphic: {
            type: 'text',
            left: "center",
            top: "center",
            style: {
                text: "营收占比",
                fontSize: 20,
                fill: "#333"
            }
        }
    })

    const res = await chartData1()
    console.log('chartData1返回', res)
    chartOption1.series[0].data = res.data.list;
    return chartOption1
}

const getChartdata2 = async () => {
    const chartOption2: any = reactive({
        title: {
            text: '电量统计'

        },
        legend: {
            data: []
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}kw'
            }
        },
        series: [
            {
                name: '',
                type: 'line',
                data: [],
                smooth: true
            },
            {
                name: '',
                type: 'line',
                data: [],
                smooth: true
            },
            {
                name: '',
                type: 'line',
                data: [],
                smooth: true
            }
        ]
    }
    )
    const res = await chartData2()
    console.log(res, "666666")
    chartOption2.legend.data = res.data.list.map((item: any) => item.name)
    for (let i = 0; i < res.data.list.length; i++) {
        chartOption2.series[i].data = res.data.list[i].data
        chartOption2.series[i].name = res.data.list[i].name
    }
    return chartOption2
}

const getChartdata3 = async () => {
    const chartOption3: any = reactive({
        radar: {
            // shape: 'circle',
            indicator: [
                { name: '闲置数', max: 65 },
                { name: '使用数', max: 160 },
                { name: '故障数', max: 300 },
                { name: '维修数', max: 380 },
                { name: '更换数', max: 520 },
                { name: '报废数', max: 250 }
            ]
        },
        series: [
            {
                name: '设备总览',
                type: 'radar',
                data: [
                    {
                        value: [],
                        name: '设备总览'
                    }
                ]
            }
        ]
    })
    const res = await chartData3()
    chartOption3.series[0].data[0].value = res.data.list
    console.log(chartOption3)
    return chartOption3
}
useChart(myChart1, getChartdata1())
useChart(myChart2, getChartdata2())
useChart(myChart3, getChartdata3())
</script>

<style lang="less" scoped>
.title {
    display: flex;
    align-items: flex-end;
    font-size: 20px;

    p {
        color: #86909c;
    }
}

.equipment {
    display: flex;
    justify-content: space-between;
    padding: 0 50px;

    .statistic-footer {
        margin-top: 10px;
    }

    .statistic-card {
        h1 {
            font-size: 36px;
        }
    }
}

.item {
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    padding: 10px;
}

.radius {
    display: inline-block;
    text-align: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgb(103, 194, 58);
    color: rgb(255, 255, 255);

    .arae {}
}
</style>