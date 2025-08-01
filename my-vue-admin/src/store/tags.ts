import {defineStore} from "pinia"
import {ref} from "vue"
import type {MenuItem} from "@/type/user"

export const useTagsStore=defineStore("tags",()=>{
    const tags=ref<MenuItem[]>([])
    const CurrentTab=ref<{name:string,url:string}>({name:"数据看板",url:"/dashboard"})

    const addTags=(name:string,url:string,icon:string)=>{
        if(!tags.value.some((tag)=>tag.url===url)){
            tags.value.push({name,url,icon})
        }
    }

    const setCurrentTab=(name:string,url:string)=>{
        CurrentTab.value={name,url}
    }

    const removeTag = (name: string) => {
        // 1. 保护：至少保留一个标签
        if (tags.value.length <= 1) return;
      
        // 2. 计算新数据
        const newTags = tags.value.filter(tag => tag.name !== name);
        const isDeletingCurrent = CurrentTab.value.name === name;
      
        // 3. 更新状态
        tags.value = newTags;
        if (isDeletingCurrent) {
          CurrentTab.value = newTags[0]; // 默认切换到第一个标签
        }
      };
    return {tags,addTags,setCurrentTab,CurrentTab,removeTag}

})