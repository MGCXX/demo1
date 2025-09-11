<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <el-card>
        <el-input placeholder="请输入关键词" style="width: 80%;" v-model="filterText">
          <template #append>
            <el-button icon="Search"></el-button>
          </template>
        </el-input>
        <el-tree class="mt" ref="treeRef" style="max-width: 600px" :data="dataList" :props="defaultProps"
          @node-click="handleNodeClick" show-checkbox :filter-node-method="filterNode" />
      </el-card>
    </el-col>

    <el-col :span="18">
      <el-card>
        <template #header>
          <h1>{{title}}计费模板</h1>
        </template>
        <el-form :model="form" label-position="top" :rules="rule" ref="myDom">
          <el-form-item label="模板名称：" prop="name">
            <el-input placeholder="请输入模板名称" style="max-width:200px;" v-model="form.name" :disabled="!title"></el-input>
          </el-form-item>
          <el-form-item :label="`时间区间${index + 1}：`" v-for="(item, index) in form.dateList" :key="index">
            <el-col :span="14">
              <el-form-item 
                :prop="`dateList.${index}.date`" 
                :rules="rule['dateList.date']"
                label="时间范围"
              >
                <el-date-picker 
                  v-model="item.date" 
                  type="datetimerange" 
                  range-separator="--" 
                  start-placeholder="开始日期"
                  end-placeholder="结束日期" 
                  style="width: 100%"
                  value-format="YYYY-MM-DD HH:mm:ss"
                />
              </el-form-item>
              
            </el-col>
            <el-col :span="6" :offset="2">
              <el-form-item 
                label="电费：" 
                :prop="`dateList.${index}.electric`"
                :rules="rule['dateList.electric']"
              >
                <el-input placeholder="请输入电费" style="max-width:200px;" v-model="item.electric"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addItem">添加时间区间</el-button>
          </el-form-item>

          <el-form-item label="服务费：" prop="service">
            <el-input style="max-width:200px;" v-model="form.service" />
          </el-form-item>
          <el-form-item label="停车费：" prop="parking">
            <el-input style="max-width:200px;" v-model="form.parking" />
          </el-form-item>
          <el-form-item label="特殊备注：" prop="textarea">
            <el-input type="textarea" v-model="form.textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="setup">创建</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue"
import { cityList } from "@/api/order/cityList"
import type { TreeInstance } from 'element-plus'


onMounted(() => {
  getCityList()
})

interface Tree {
  label: string
  children?: Tree[]
}

const dataList = ref<Tree[]>([])
const defaultProps = {
  children: 'children',
  label: 'label',
}
const title=ref("")
const handleNodeClick = (data: Tree) => {
  if(!data.children){
    title.value=data.label
  }
}

async function getCityList() {
  const { data } = await cityList()
  console.log(data, "城市列表")
  dataList.value = data
}

const treeRef = ref<TreeInstance>()
const filterText = ref("")
const filterNode: any = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}
watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

const form = ref({
  name: "",
  service: "",
  parking: "",
  textarea: "",
  dateList: [
    { date: [], electric: "" }
  ]
})

function addItem() {
  form.value.dateList.push({ date: [], electric: "" })
}

const rule = reactive({
  name: [{
    required: true, message: "请输入名称", trigger: "blur"
  }],
  service: [{
    required: true, message: "请输入服务费", trigger: "blur"
  }],
  parking: [{
    required: true, message: "请输入电费", trigger: "blur"
  }],
  textarea: [{
    required: true, message: "请输入备注", trigger: "blur"
  }],
  'dateList.date': [{ 
    required: true, 
    message: "请选择时间范围", 
    trigger: "change" 
  }],
  'dateList.electric': [{ 
    required: true, 
    message: "请输入电费", 
    trigger: "blur" 
  }]
})

const myDom=ref()
function setup(){
  myDom.value?.validate((valid:any)=>{
      if(valid){
        console.log('验证成功', form.value.dateList) 
      } else {
        console.log('验证失败')
      }
  })
}

function reset(){
  form.value={
    name: "",
    service: "",
    parking: "",
    textarea: "",
    dateList: [{ date: [], electric: "" },]
  }
}


</script>