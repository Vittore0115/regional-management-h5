<template>
  <div style="text-align:center;">
    <!-- <van-button type="primary" v-copy='`湿哒哒沙雕`'>拷贝按钮</van-button> -->
		<van-button type="primary" @click="popupHandle">请选择地址</van-button>
		<!-- 地址选择 -->
    <van-popup
      v-model:show="popupShow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-area
        title="请选择地址"
        :area-list="areaList"
        @confirm="confirmArea"
        @cancel="canCelArea"
      />
    </van-popup>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted,getCurrentInstance, toRefs, reactive } from 'vue'
import { getInfo } from '@/api/home'
export default defineComponent({
  components:{  },
  setup:()=>{
		const state = reactive({
			popupShow : false, // 是否展示
			areaList:{
				province_list :{}, 	// 省
				city_list:{}, // 市
				county_list:{} 	// 区
			}
		})
		const methods = {
			popupHandle(){
				state.popupShow = true
			},
			confirmArea(){
				state.popupShow = false
			},
			canCelArea(){
				state.popupShow = false
			},
			async getAreaList(){
				let params = {
					isList : true
				}
				const res = await getInfo(params)
				if(res.length > 0){
					// 省
					let resOne =  res.filter((item)=>{
						return item.level == 1 && item.status != 0
					})
					// 市
					let resTwo =  res.filter((item)=>{
						return item.level == 2 && item.status != 0
					})
					// 区
					let resThree =  res.filter((item)=>{
						return item.level == 3 && item.status != 0
					})

					resOne.forEach((ele)=>{
						state.areaList.province_list[ele.code] = ele.name 
					})
					
					resTwo.forEach((ele)=>{
						state.areaList.city_list[ele.code] = ele.name 
					})
					
					resThree.forEach((ele)=>{
						state.areaList.county_list[ele.code] = ele.name 
					})	
				}
			}
		}
		// 这里的ctx  类似于vue2的this
    const { proxy: ctx } = getCurrentInstance();

    onMounted(() => {
			ctx.getAreaList()
      console.log('第一次加载')
    })
   
    return{
      ...toRefs(state),
			...methods
    }

  },
  computed:{
  }
  
  
})
</script>

<style lang="scss" scoped>
</style>