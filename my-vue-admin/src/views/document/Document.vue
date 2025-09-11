<template>
  <el-card>
    <div class="item">
      <div>文章管理：</div>
      <div>
        <el-tag :type="currenIndex[0]==-1?'primary':'info'">全部</el-tag>
        <el-tag v-for="(tag, index) in typeData" :key="index" @click="selected(tag,0,index)" :type="currenIndex[0]==index?'primary':'info'">{{ tag }}</el-tag>
      </div>
    </div>
    <div class="item">
      <div>重要程度：</div>
      <div>
        <el-tag :type="currenIndex[1]==-1?'primary':'info'">全部</el-tag>
        <el-tag v-for="(tag, index) in importData" :key="index" @click="selected(tag,1,index)" :type="currenIndex[1]==index?'primary':'info'">{{ tag }}</el-tag>
      </div>
    </div>
    <div class="item">
      <div>发布渠道：</div>
      <div >
        <el-tag :type="currenIndex[2]==-1?'primary':'info'">全部</el-tag>
        <el-tag v-for="(tag, index) in publishData" :key="index" @click="selected(tag,2,index)" :type="currenIndex[2]==index?'primary':'info'">{{ tag }}</el-tag>
      </div>
    </div>
    <hr style="margin: 25px 0;">
    <div class="item">
      <div>已选：</div>
      <el-tag type="success" closable v-for="(item, index) in seclcts" :key="index" @close="handleClose(item.num)">{{ item.tag }}</el-tag>
    </div>
  </el-card>

  <el-card class="mt">
    <el-button type="primary" class="mt mb" @click="getEditorContent">导出富文本到HTML文件</el-button>
    <Editor
      ref="editorRef"
      v-model="EditorContent"
      api-key="66jo0k3nuenp3qrt8ry6w3onk8yp1em15b706rh18cegay2p"
      :init="{
        language: 'zh_CN',
        plugins: 'advlist anchor autolink charmap code fullscreen help image insertdatetime link lists media preview searchreplace table visualblocks wordcount',
        toolbar: 'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        height: 500,
      }"
    />
  </el-card>
</template>

<script setup lang="ts">
import { getDocument } from "@/api/documentApi"
import { ref } from "vue"
import Editor from '@tinymce/tinymce-vue'

interface seclctTpye{
  tag:string,
  num:number     //num做标记 分类
}

const currenIndex=ref([-1,-1,-1])
const typeData = ref<string[]>([])
const importData = ref<string[]>([])
const publishData = ref<string[]>([])
const getData = async () => {
  const { data: { type, important, publish } } = await getDocument()
  typeData.value = type
  importData.value = important
  publishData.value = publish
}
getData()

const seclcts = ref<seclctTpye[]>([])   //[{name:"招商类",num:0},{name:"二级",num:1}]  num:点击的是第num个
const selected = (tag:string,num:number,index:number) => {
  currenIndex.value[num]=index
  const number=seclcts.value.findIndex((item:seclctTpye)=>item.num==num)  //在数组的位置
  if(number==-1){
    seclcts.value.push({tag,num})
  }else{
    seclcts.value[number]={tag,num}
  }
}

const handleClose = (num:number) => {
  seclcts.value=seclcts.value.filter((item)=>item.num!==num)
  currenIndex.value[num]=-1
}

const editorRef = ref(null); // 定义一个 ref 来引用编辑器实例
const EditorContent = ref('')
const getEditorContent = () => {
 // 获取编辑器内容
      // 创建一个 Blob 对象
      const blob = new Blob([EditorContent.value], { type: 'text/html' });
      // 创建一个链接元素
      const link = document.createElement('a');
      // 将 Blob 对象的 URL 设置为链接地址
      link.href = URL.createObjectURL(blob);
      // 设置下载文件的名称
      link.download = 'document.html';
      // 触发点击事件以下载文件
      link.click();
      // 释放 URL 对象
      URL.revokeObjectURL(link.href);
};
</script>

<style lang="less" scoped>
.item {
  display: flex;
  margin-top: 20px;

  .el-tag {
    margin: 0 10px;
    cursor: pointer;
  }
}
</style>