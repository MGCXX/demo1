<template>
  <el-card>
    <el-select placeholder="选择站点名称" style="width:300px" v-model="name" filterable>
      <el-option v-for="(item, index) in select" :key="index" :value="item.name"></el-option>
    </el-select>
  </el-card>

  <el-card class="mt">
    <el-radio-group v-model="activeName" type="card" class="demo-tabs" @change="handleClick">
      <el-radio-button :label="`全部(${allCount})`" :value="0"></el-radio-button>
      <el-radio-button :label="`空闲中(${checkCount(1)})`" :value="1"></el-radio-button>
      <el-radio-button :label="`充电中(${checkCount(2)})`" :value="2"></el-radio-button>
      <el-radio-button :label="`连接中(${checkCount(3)})`" :value="3"></el-radio-button>
      <el-radio-button :label="`排队中(${checkCount(4)})`" :value="4"></el-radio-button>
      <el-radio-button :label="`已预约(${checkCount(5)})`" :value="5"></el-radio-button>
      <el-radio-button :label="`故障/离线(${checkCount(6)})`" :value="6"></el-radio-button>
    </el-radio-group>
  </el-card>

  <el-card class="mt">
    <el-row :gutter="24">
      <el-col :span="6" v-for="item in dataListCopy" :key="item.id">
        <div class="bg mb">
          <div class="item">
            <div>
              <h3 v-if="item.status == 1"> 空闲中 </h3>
              <h3 v-if="item.status == 2"> 充电中 </h3>
              <h3 v-if="item.status == 3"> 连接中 </h3>
              <h3 v-if="item.status == 4"> 排队中 </h3>
              <h3 v-if="item.status == 5"> 被预约 </h3>
              <h3 v-if="item.status == 6"> 故障/离线 </h3>
              <img :src="item.status == 1 ? free : (item.status == 6 ? outline : ing)" width="100px" />
              <p>62%</p>
            </div>
            <div class="ml" style="color: #999999;">
              <h2>{{ item.id }}</h2>
              <hr class="mb">
              <p>电压：{{ item.voltage }}</p>
              <p>电流：{{ item.current }}</p>
              <p>功率：{{ item.power }}</p>
              <p>温度：{{ item.tem }}</p>
            </div>
          </div>
          <div class="divder"></div>
          <div class="btn">
            <p class="fl" style="color: #999999;">暂无预警</p>
            <div class="fr">
              <el-button>维保记录</el-button>
                <el-popover :width="300" title="使用记录"  placement="right">
                  <template #reference>
                    <el-button type="primary">使用记录</el-button>
                  </template>
                  <el-timeline style="max-width: 600px">
                    <el-timeline-item
                      v-for="(i, index) in item.record"
                      :key="index"
                      :timestamp="i.time"
                      :hollow="true"
                      type="primary"
                    >
                      {{ i.msg }}
                    </el-timeline-item>
                  </el-timeline>
                </el-popover>

            </div>

          </div>
        </div>


      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import {  ref, onMounted, computed, watch } from "vue"
import { getcurrentList } from "@/api/chargingstation/tabledata"
import free from "@/assets/free.png"
import outline from "@/assets/outline.png"
import ing from "@/assets/ing.png"

const name = ref("")
const select = ref<any>([])
const dataList = ref<any>([])
const dataListCopy = ref<any>([])
const loadData = async () => {
  try {
    const { data } = await getcurrentList()
    select.value = data
    dataList.value = data[0].list // 保存原始数据
    dataListCopy.value = data[0].list  //做列表渲染
  } catch (error) {
    console.log(error)
  }

}

function checkCount(num: number) {
  return dataList.value.filter((item: any) => item.status == num).length
}


const allCount = computed(() => checkCount(1) + checkCount(2) + checkCount(3) + checkCount(4) + checkCount(5) + checkCount(6))
const activeName = ref(0)
const handleClick = () => {
  if (activeName.value === 0) {
    dataListCopy.value = dataList.value
  } else {
    dataListCopy.value = dataList.value.filter((item: any) => item.status == activeName.value)
  }
}


watch(name, () => {
  console.log(name.value, "我是选项", select.value.filter((item: any) => item.name == name.value))
  const res = select.value.filter((item: any) => item.name == name.value)
  dataList.value = res[0].list
  dataListCopy.value = res[0].list
  activeName.value = 0
})

onMounted(() => {
  loadData()
})

</script>

<style lang="less" scoped>
.bg {
  background-color: rgb(247, 251, 254);
  height: 300px;

  .item {
    height: 200px;
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 20px;

    h3 {
      width: 90px;
      text-align: center;
      color: #3dbb92;
      margin-bottom: 10px;
    }
  }

  .divder {
    width: 98%;
    background-color: #f4f4f4;
    height: 2px;
    margin: auto;
  }

  .btn {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
  }
}
</style>