<template>
    <el-tabs type="card" v-model="CurrentTab.name" class="demo-tabs" @tab-click="handleClick" closable @tab-remove="remove">
        <el-tab-pane  :name="item.name" v-for="item in tags" :key="item.url" :label="item.name">
            <template #label>
                <span class="custom-tabs-label">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{item.name }}</span>
                </span>
            </template>
        </el-tab-pane>
    </el-tabs>
   
   <RouterView v-slot="{Component}">
        <KeepAlive>
            <component :is="Component" v-if="$route.meta.keepAlive"></component>
        </KeepAlive>
            <component :is="Component" v-if="!$route.meta.keepAlive"></component>
   </RouterView>

</template>

<script setup lang="ts">
import { useTagsStore } from '@/store/tags'
import { storeToRefs } from 'pinia'
import {useRouter,useRoute} from "vue-router"
import { useUserStore } from '@/store/auth'


const tagsStore=useTagsStore()
const userStore=useUserStore()
const { tags ,CurrentTab} = storeToRefs(tagsStore)
const {setCurrentTab,addTags}=tagsStore
const router=useRouter()

const handleClick = ({index}:{index:number}) => {
    setCurrentTab(tags.value[index].name,tags.value[index].url)
    router.push(tags.value[index].url)
}

function findObjectByUrl(arr:any,url:string){
    for(const item of arr){
        if(item.url===url){
            return item
        }
        if(item.children){
            const found:any=findObjectByUrl(item.children,url)
            if(found){
                return found
            }
        }
    }
    return null    
}
const route=useRoute()
const {menu}=storeToRefs(userStore)
const {name,url,icon}=findObjectByUrl(menu.value,route.path)
addTags(name,url,icon)
setCurrentTab(name,url)

const {removeTag}=tagsStore
const remove=(TabPaneName:string)=>{
    removeTag(TabPaneName);
    router.push(CurrentTab.value.url)
}

</script>

<style scoped lang="less">
.demo-tabs {
    :deep(.is-active) {
        background-color: rgb(34, 136, 255) !important; 
        color: #fff !important;
    }
}
</style>