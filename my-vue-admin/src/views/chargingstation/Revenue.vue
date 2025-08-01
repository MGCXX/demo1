<template>
  <el-row :gutter="24">
    <el-col :span="4">
      <el-card>
        <div class="title">
          <div class="background">
            <el-icon>
              <Document />
            </el-icon>
          </div>
          <h3 class="title ml">今日总收入（元）</h3>
        </div>
        <div class="total mt">
          <h1>{{ TOthousands(12239824) }}</h1>
          <div class="percent">-21%</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card>
        <div class="title">
          <div class="background">
            <el-icon>
              <Document />
            </el-icon>
          </div>
          <h3 class="title ml">本月总收入（万元）</h3>
        </div>
        <div class="total mt">
          <h1>{{ TOthousands(2924) }}</h1>
          <div class="percent">-21%</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card>
        <div class="title">
          <div class="background">
            <el-icon>
              <Document />
            </el-icon>
          </div>
          <h3 class="title ml">会员卡储值金额（元）</h3>
        </div>
        <div class="total mt">
          <h1>{{ TOthousands(239824) }}</h1>
          <div class="percent">-16%</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card>
        <div class="title">
          <div class="background">
            <el-icon>
              <Document />
            </el-icon>
          </div>
          <h3 class="title ml">服务费总金额（元）</h3>
        </div>
        <div class="total mt">
          <h1>{{ TOthousands(16824) }}</h1>
          <div class="percent">-7%</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card>
        <div class="title">
          <div class="background">
            <el-icon>
              <Document />
            </el-icon>
          </div>
          <h3 class="title ml">停车费总金额（元）</h3>
        </div>
        <div class="total mt">
          <h1>{{ TOthousands(9687) }}</h1>
          <div class="percent">-4%</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card>
        <div class="title">
          <div class="background">
            <el-icon>
              <Document />
            </el-icon>
          </div>
          <h3 class="title ml">电费总金额（元）</h3>
        </div>
        <div class="total mt">
          <h1>{{ TOthousands(223674) }}</h1>
          <div class="percent">-19%</div>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-card class="mt">
    <div ref="myChart" style="width: 100%;height: 400px;"></div>
  </el-card>

  <el-card class="mt">
      <el-input placeholder="请输入站点名称" style="max-width:400px" v-model="name" >
        <template #append>
          <el-button @click="loadData">查询</el-button>
        </template>
      </el-input>
    
      <el-table :data="tableData" v-loading="loading" >
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="name" label="站点名称" />
        <el-table-column prop="id" label="站点ID" />
        <el-table-column prop="city" label="所属城市" />
        <el-table-column prop="count" label="充电桩总数量" />
        <el-table-column prop="electricity" label="电费" />
        <el-table-column prop="parkingFee" label="停车费" />
        <el-table-column prop="serviceFee" label="服务费" />
        <el-table-column prop="day" label="单日总收入" >
            <template #default="scope">
              <span class="mr">{{ TOthousands(scope.row.day) }}</span>
              <el-tag :type="scope.row.percent > 0 ? 'success' : 'danger'">{{ scope.row. percent}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="month" label="月度总收入" >
          <template #default="scope">
              <span class="mr">{{ TOthousands(scope.row.month) }}</span>
              <el-tag :type="scope.row.mpercent > 0 ? 'success' : 'danger'">{{ scope.row.mpercent}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="member" label="会员储值金" />
      </el-table>
  </el-card>
  <el-pagination
      v-model:current-page="pageInfo.page"
      v-model:page-size="pageInfo.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totals"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

</template>

<script setup lang="ts">
import TOthousands from "@/utils/toThousands"
import { useChart } from "@/hook/useChart"
import { reactive, ref } from "vue"
import { getRevenueChart,getRevenueList } from "@/api/chargingstation/tabledata"

const myChart = ref(null)
const getChartData = async () => {
  const option = reactive({
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: []
    },
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
    },
    yAxis: [
      {
        type: 'value',
        name: '销售',
        position: 'left'
      },
      {
        type: 'value',
        name: '访问量',
        position: 'right'
      }
    ],
    series: [
      {
        name: '',
        data: [],
        type: 'bar',
        yAxisIndex: 0,
        itemStyle: {
          color: '#409eff'
        }
      },
      {
        name: '',
        data: [],
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        itemStyle: {
          color: '#409eff'
        }
      }
    ]
  });

  const res = await getRevenueChart()
  console.log('Revenue chart data:', res)
  // 更新图例数据
  option.legend.data = res.data.list.map((item: any) => item.name)
  // 更新系列数据
  for (let i = 0; i < res.data.list.length; i++) {
    option.series[i].name = res.data.list[i].name
    option.series[i].data = res.data.list[i].data
  }
  return option
}
useChart(myChart, getChartData())

const name=ref("")
const tableData=ref([])
const loading=ref(false)
const pageInfo=reactive({
  page:1,
  pageSize:10
})
const totals=ref(null)
const loadData=async ()=>{
  loading.value=true
  const {data:{list,total}}=await getRevenueList({name:name.value,...pageInfo})
  totals.value=total
  console.log(total,"总的")
  tableData.value = list.map((item: any) => ({
    ...item,
    day: item.electricity + item.parkingFee + item.serviceFee
  }))
  loading.value=false
}
loadData()

const handleSizeChange = (page: number) => {
  pageInfo.pageSize = page
  pageInfo.page = 1
  loadData()
}

const handleCurrentChange = (CurrentPage: number) => {
  pageInfo.page = CurrentPage
  loadData()
}
</script>

<style scoped lang="less">
.title {
  display: flex;
  align-items: center;

  .background {
    width: 30px;
    height: 30px;
    background-color: #ebecf5;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
  }
}

.total {
  display: flex;
  align-items: center;

  h1 {
    font-size: 32px;
  }

  .percent {
    margin-left: 10px;
    background-color: rgb(235, 247, 239);
    color: green;
  }
}
</style>
