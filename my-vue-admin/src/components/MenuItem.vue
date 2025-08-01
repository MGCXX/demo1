<template>
    <el-sub-menu v-if="item.children" :index="item.url">
        <template #title>
            <el-icon>
                <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
        </template>
        <my-menu v-for="child in item.children" :item="child" :key="child.url"></my-menu>
    </el-sub-menu>
    <el-menu-item v-else :index="item.url" v-show="!(item.name=='订单详情')" @click="add(item.name,item.url,item.icon)">
        <el-icon>
            <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
    </el-menu-item>
</template>

<script scoped lang="ts">
import { defineComponent, onUpdated, } from 'vue';
import type { PropType } from 'vue';
import type { MenuItem } from "@/type/user"
import {useTagsStore} from "@/store/tags"
export default defineComponent({
    name: "MyMenu",
    props: {
        item: {
            type: Object as PropType<MenuItem>,
            required: true
        }
    },
    setup(){
        const tagsStore=useTagsStore()
        const {addTags,setCurrentTab}=tagsStore
        
        const add=(name:string,url:string,icon:string)=>{
            addTags(name,url,icon)
            setCurrentTab(name,url)
        }
        

        return {add}
    }
})

</script>

<style scoped>
.is-active {
    background-color: rgb(34, 136, 255)!important;color: #fff!important;
}
.el-menu-item:hover{
    background-color:rgb(34, 136, 255) !important;color: #fff !important ;
}
::v-deep .el-sub-menu__title:hover{
    background-color:rgb(34, 136, 255) !important;color: #fff !important ;
}

</style>