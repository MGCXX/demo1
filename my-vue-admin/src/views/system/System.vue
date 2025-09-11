<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入姓名" v-model="search.input"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select placeholder="请选择部门" v-model="search.select">
          <el-option label="全部" value=""></el-option>
          <el-option label="总裁办" value="总裁办"></el-option>
          <el-option label="技术部" value="技术部"></el-option>
          <el-option label="市场部" value="市场部"></el-option>
          <el-option label="维修部" value="维修部"></el-option>
          <el-option label="运营部" value="运营部"></el-option>
          <el-option label="客服部" value="客服部"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button>重置</el-button>
      </el-col>
    </el-row>
  </el-card>

  <el-card class="mt">
    <el-table :data="tableData">
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="账号" prop="account"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="身份证" prop="idNo"></el-table-column>
      <el-table-column label="职位" prop="position">
        <template #default="scope">
          <el-tag>{{ scope.row.position }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="部门" prop="department"></el-table-column>
      <el-table-column label="页面权限" prop="pageAuthority">
        <template #default="scope">
          <el-tag type="success">{{ scope.row.pageAuthority }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="按钮权限" prop="btnAuthority">
        <template #default="scope">
          <el-tag type="info">{{ scope.row.btnAuthority }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template #default="scope">
          <el-button type="primary" size="small" @click="openTree(scope.row.pageAuthority,scope.row.account)">权限设置</el-button>
          <el-button type="danger" size="small">禁用</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>

      </el-table-column>
    </el-table>
  </el-card>
  <AuthModal :visible="visible" :getUrl="getUrl"  :checkBtn="checkBtn" @close="visible=false" :account="accountNo"></AuthModal>
</template>

<script setup lang="ts">
import { onMounted, ref, } from "vue"
import { useTable } from "@/hook/useTable"
import AuthModal from "./AuthModal.vue"
import { userAuth } from "@/api/system"
import type {MenuItem} from "@/type/user"

const search = ref({
  input: "",
  select: ""
})
const { tableData, loadData } = useTable("/permissionList", search.value)
onMounted(async () => {
  await loadData()
})

const visible = ref(false)
const getUrl = ref<string[]>([])
function getAllUrl(nodes: MenuItem[]) {
  const allUrl: string[] = []
  function repeat(arr: MenuItem[]) {
    arr.forEach((item) => {
      if (item.url && !item.children) {
        allUrl.push(item.url)
      }
      if (item.children) {
        repeat(item.children)
      }
    })
  }
  repeat(nodes)
  return allUrl
}

const checkBtn=ref([])
const accountNo=ref("")
const openTree = async (pageAuthority: string,account:string) => {
  try {
    const { data: { list,btn } } = await userAuth(pageAuthority)
    getUrl.value = getAllUrl(list)
    checkBtn.value=btn
    accountNo.value=account
    visible.value = true
  } catch (error) {
    console.error(error)
  }

}



</script>