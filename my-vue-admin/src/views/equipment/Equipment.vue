<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入卡号" v-model="search.no"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入手机号" v-model="search.tel"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入姓名" v-model="search.name"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button>重置</el-button>
      </el-col>
    </el-row>
  </el-card>

  <el-card class="mt">
    <el-table :data="tableData">
      <el-table-column width="80" label="序号" type="index"></el-table-column>
      <el-table-column label="会员卡号" prop="memberCardNumber"></el-table-column>
      <el-table-column label="卡类型" prop="cardType"></el-table-column>
      <el-table-column label="开卡日期" prop="issueDate"></el-table-column>
      <el-table-column label="持有人姓名" prop="holderName"></el-table-column>
      <el-table-column label="持有人电话" prop="holderPhone"></el-table-column>
      <el-table-column label="卡余额" prop="cardBalance"></el-table-column>
      <el-table-column label="消费记录" prop="transactionRecords">
        <template #default="scope">
          <el-popover class="box-item" title="消费记录" placement="left" width= "250">
            <template #reference>
              <el-button>消费记录</el-button>
            </template>
            <el-timeline >
              <el-timeline-item v-for="(item, index) in scope.row.transactionRecords" :key="index" :timestamp="item.transactionDate" type="primary" :hollow="true">
                <div>消费金额：{{ item.transactionAmount }}</div>
                <div>消费练类型：{{ item.transactionType }}</div>
              </el-timeline-item>
            </el-timeline>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="有效期至" prop="validUntil"></el-table-column>item
    </el-table>
    <el-pagination class="fr mt mb" v-model:current-page="pageInfo.page" v-model:page-size="pageInfo.pageSize"
      :page-sizes="[10, 20, 30, 40]" background layout="total, sizes, prev, pager, next, jumper" :total="totals"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </el-card>
</template>

<script setup lang="ts">
import { useTable } from "@/hook/useTable"
import { reactive } from "vue";

const search = reactive({
  no: "",
  tel: "",
  name: ""
})
const { tableData,  pageInfo, totals, loadData, handleSizeChange, handleCurrentChange } = useTable("/member", search)
</script>