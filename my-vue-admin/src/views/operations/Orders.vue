<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入订单号" v-model="search.id"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model="search.status">
          <el-option label="全部" :value="1"></el-option>
          <el-option label="进行中" :value="2"></el-option>
          <el-option label="已完成" :value="3"></el-option>
          <el-option label="异常" :value="4"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="订单编号" v-model="search.number"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button>重置</el-button>
      </el-col>
      <el-col :span="6" class="mt">
        <el-input placeholder="请输入站点名称" v-model="search.name"></el-input>
      </el-col>
      <el-col :span="6" class="mt">
        <el-date-picker v-model="date" type="daterange" range-separator="/" start-placeholder="开始时间"
          end-placeholder="结束时间" @change="dateChange" value-format="YYYY-MM-DD HH:mm:ss" />
      </el-col>
    </el-row>
  </el-card>

  <el-card class="mt">
    <el-button type="danger" @click="requireDelete">批量删除</el-button>
    <el-button type="primary" icon="Download" @click="exportToExcel">
      导出订单数据到Excel
    </el-button>
  </el-card>

  <el-card>
    <el-table :data="tableData" v-loading="loading" @selection-change="SelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="orderNo" label="订单号"></el-table-column>
      <el-table-column prop="equipmentNo" label="设备编号"></el-table-column>
      <el-table-column prop="date" label="订单日期"></el-table-column>
      <el-table-column prop="startTime" label="开始时间"></el-table-column>
      <el-table-column prop="endTime" label="结束时间"></el-table-column>
      <el-table-column prop="money" label="金额"></el-table-column>
      <el-table-column prop="pay" label="支付方式"></el-table-column>
      <el-table-column prop="status" label="订单状态">
        <template #default="scope">
          <el-tag :type="scope.row.status === 2 ? 'success' : (scope.row.status === 3 ? 'primary' : 'warning')">{{
            scope.row.status === 2 ? '进行中' : (scope.row.status === 3 ? '已完成' : '异常') }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="routeChange(scope.row)">详情</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="fr mt mb" v-model:current-page="pageInfo.page" v-model:page-size="pageInfo.pageSize"
      :page-sizes="[10, 20, 30, 40]" background layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="totals" />
  </el-card>
</template>

<script setup lang="ts">
import {  ref, watch } from "vue"
import { useTable } from "@/hook/useTable"
import { useRoute, useRouter } from "vue-router";
import { useTabDetail } from "@/store/tabDetail"
import { useTagsStore } from "@/store/tags";
import { batchDelete } from "@/api/order/batchDelete"
import { ElMessage } from "element-plus";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver"


interface searchType {
  id: string;
  status: number;
  number: string;
  name: string;
}

interface SelectionListType {
  orderNo: string,
  equipmentNo: string,
  date: string,
  startTime: string,
  endTime: string,
  money: string,
  pay: string,
  status: number
}
const search = ref<searchType>({
  id: "",
  status: 1,
  number: "",
  name: "",
})
const date = ref([])
function dateChange() {
  console.log(date.value)
}

const { tableData, loading, pageInfo, totals,
  loadData, handleSizeChange, handleCurrentChange
} = useTable("/orderList", search.value)

const route = useRoute()
const router = useRouter()
const tagsStore = useTagsStore()
const { addTags, setCurrentTab } = tagsStore
const tabDetail = useTabDetail()
function routeChange(row: SelectionListType) {
  addTags("订单详情", "detail", "Share")
  setCurrentTab("订单详情", "detail")
  tabDetail.setRowData(row)
  router.push(`/operations/detail?orderNo=${row.orderNo}`)
}


const selected = ref<SelectionListType[]>([])
function SelectionChange(newSelection: SelectionListType[]) {
  selected.value = newSelection
}

async function requireDelete() {
  const res = await batchDelete(selected.value.map((item) => item.orderNo));
  if (res.code == 200) {
    ElMessage.success("删除成功")
    loadData()
  }
}

const exportToExcel = () => {
  const ws = XLSX.utils.json_to_sheet(selected.value);//把数据转成工作表格式
  const wb = XLSX.utils.book_new();//创建新的工作簿
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");//工作簿加到工作表中
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" })
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  saveAs(blob, "导入的数据.xlsx")
}


watch(() => route.name, (to, from) => {
  if (to == "orders" && from !== "detail") {
    loadData()
  }
})


</script>