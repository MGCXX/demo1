function translate(arr:any){
    return arr.map((item:any)=>{
        const newArr:any={
            label:item.name,
            url:item.url
        }
        if(item.children){
            newArr.children=translate(item.children)
        }
        return newArr
    })
}

export {translate}