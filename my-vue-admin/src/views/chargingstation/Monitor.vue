<template>
  <div>充电站监控</div>
  <el-card>
    <el-row :gutter="24">
      <el-col :span="6">
        <el-input v-model="formParams.search">
          <template #append>
            <el-select v-model="select" style="width: 115px">
              <el-option label="按名称查询" value="name"></el-option>
              <el-option label="按ID查询" value="id"></el-option>
            </el-select>
          </template>
        </el-input>

      </el-col>
      <el-col :span="6">
        <el-select v-model="formParams.status">
          <el-option label="全部" :value="1"></el-option>
          <el-option label="使用中" :value="2"></el-option>
          <el-option label="空闲中" :value="3"></el-option>
          <el-option label="维护中" :value="4"></el-option>
          <el-option label="待维修" :value="5"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" :offset="6">
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-col>
    </el-row>
  </el-card>

  <el-card class="mt">
    <el-row>
      <el-col :span="6">
        <el-statistic title="累计充电量(度)" :value="268900" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="累计充电次数(次)" :value="1389"></el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="服务区域(个)" :value="88" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="累计效益(元)" :value="5622178"></el-statistic>
      </el-col>
    </el-row>
  </el-card>

  <el-card class="mt">
    <el-button type="primary" icon="Plus" @click="visible = true">新增充电站</el-button>
  </el-card>

  <el-card class="mt">
    <el-table :data="tableData" v-loading="loading">
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="name" label="站点名称" />
      <el-table-column prop="id" label="站点ID" />
      <el-table-column prop="city" label="所属城市" />
      <el-table-column prop="fast" label="快充数" />
      <el-table-column prop="slow" label="慢充数" />
      <el-table-column prop="status" label="充电站状态">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 2" type="warning">使用中</el-tag>
          <el-tag v-if="scope.row.status === 3" type="danger">空闲中</el-tag>
          <el-tag v-if="scope.row.status === 4" type="success">维护中</el-tag>
          <el-tag v-if="scope.row.status === 5" type="success">待维修</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="now" label="正在充电" />
      <el-table-column prop="fault" label="充电故障" />
      <el-table-column prop="person" label="站点负责人" />
      <el-table-column prop="tel" label="负责人电话" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm @confirm="handleDelete(scope.row)" title="确定删除吗">
            <template #reference>
               <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="fr mt mb" v-model:current-page="pageInfo.page" v-model:page-size="pageInfo.pageSize"
      :page-sizes="[10, 20, 30, 40]" background layout="total, sizes, prev, pager, next, jumper" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </el-card>
  <StationForm :visible="visible" @close="visible = false" />
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue"
import { getTableData, deleteStation } from "@/api/chargingstation/tabledata"
import type { RowType } from "@/type/RowType"
import { useStationStore } from '@/store/station'
import StationForm from "./components/StationForm.vue"



const loading = ref(false)
const stationStore = useStationStore()
const select = ref("name")
const formParams = reactive<{search:string,status:number}>({
  search: "", //用ID 还是 名称查询
  status: 1
})

const pageInfo = reactive({
  page: 1,
  pageSize: 10
})
const tableData = ref<RowType[]>([])
const total = ref(0)
const visible = ref(false)
const loadData = async () => {        //[select.value]意思是选择的是ID还是名称
  loading.value = true
  const res = await getTableData({ [select.value]: formParams.search, status: formParams.status, ...pageInfo })
  tableData.value = res.data.list
  total.value = res.data.total
  loading.value = false
}

onMounted(() => {
  loadData()
})
function handleSizeChange(page: number) {
  pageInfo.pageSize = page
  pageInfo.page = 1
  loadData()
}

function handleCurrentChange(CurrentPage: number) {
  pageInfo.page = CurrentPage
  loadData()
}

function handleEdit(row: RowType) {
  stationStore.setRowData(row)
  visible.value = true
}

function resetForm() {
  select.value = "name"
  formParams.search = ""
  formParams.status = 1
  pageInfo.page = 1
  pageInfo.pageSize = 10
  loadData()
}

function handleDelete(row: RowType) {
  const res = deleteStation(row)
  console.log(res)
  loadData()
}
</script>