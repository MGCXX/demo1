function TOthousands(num: number):string{
    if(isNaN(num)||(typeof(num)!="number")){     
        throw new Error("需要是有效数字")
    }
    const [initnum,end]=num.toString().split(".")  //12423.45   ["1242345" ,"45"  ]
    let newInitnum=""
    for(let i=initnum.length-1,j=0;i>=0;i--,j++){
        newInitnum=initnum[i]+newInitnum
        if(j%3===2&&i!==0){
            newInitnum=","+newInitnum
        }
    }
    return end?`${newInitnum}.${end}`:newInitnum
}
export default TOthousands