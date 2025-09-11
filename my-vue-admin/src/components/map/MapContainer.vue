<template>
    <div id="container"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import flashIcon from "@/assets/flashIcon.png"
import satation from "@/assets/station.jpg"
import { getMapList } from "@/api/map/map"
let map = null;
const MapList = ref([])
onMounted(() => {
    AMapLoader.load({
        key: "3efbe4968cb0e1050217abdca081b7aa", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']

    })
        .then((AMap) => {
            map = new AMap.Map("container", {
                // 设置地图容器id
                viewMode: "3D", // 是否为3D地图模式
                zoom: 5, // 初始化地图级别
                center: [116.397428, 39.90923], // 初始化地图中心点位置
            });


            getMapList().then(({ data }) => {
                MapList.value = data
                const infoWindow = new AMap.InfoWindow({
                    offset: new AMap.Pixel(0, -30),
                })
                MapList.value.forEach(item => {
                    const marker = new AMap.Marker({
                        icon: flashIcon, //自定义点标记覆盖物内容
                        position: item.position, //基点位置
                        offset: new AMap.Pixel(-13, -30), //相对于基点的偏移位
                    });
                   
                    marker.on('click', () => {
                        infoWindow.setContent(`
                            <div style="display:flex;align-items:center;padding:10px">
                                <div>
                                    <img src="${satation}" style="width:200px"/>
                                </div>
                                <div style="width:180px;margin-left:10px">
                                    <h3>${item.title}</h3>
                                    <p>充电桩数量：${item.count}</p>
                                    <p>充电站状态：<span style="color:blue">${item.status==1?'使用中':'维护中'}</span></p>
                                </div>
                            </div>
                        `);
                        infoWindow.open(map, marker.getPosition())
                    })
                    map.add(marker);
                })

            })
        })
        .catch((e) => {
            console.log(e);
        });
});

onUnmounted(() => {
    map?.destroy();
});
</script>



<style scoped>
#container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 800px;
}
</style>