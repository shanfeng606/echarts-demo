<template>
  <div class="sales-report">
    <div class="header">电商商品销售趋势图</div>

    <div class="content">
      <div class="content-title-wrapper">月销售增长率</div>
      <div class="content-index-wrapper">
        <span class="arrow-up">
          <svg
            data-v-666af9e5
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="angle-up"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            class="svg-inline--fa fa-angle-up fa-w-10"
          >
            <path
              data-v-666af9e5
              fill="currentColor"
              d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"
            />
          </svg>
        </span>
        <span class="num">
          34
          <span>%</span>
        </span>
        <span class="text">+14,400</span>
      </div>
      <!-- 表单----------------------- -->
      <div id="content-chart"></div>

      <div class="content-circle-wrapper">
        <div 
        :class="['circle',selectedIndex===index?'selected':'']" 
        v-for="(item,index) in circle" 
        :key="index"
        @click="change(index)">
        </div>
      </div>
      <div class="content-bottom-wrapper">销售趋势</div>
    </div>

    <!-- footer ---------------- -->
    <div class="footer">
      <div class="footer-wrapper">
        <div class="left">
          <div class="footer-title">订单销售额</div>
          <div class="footer-sub-title">3月累计销售额</div>
        </div>
        <div class="right">
          <small>¥</small> 300,254.00
        </div>
      </div>
      <div class="progress-wrapper">
        <div class="progress-bg">
          <div class="progress-current" :style="{ width: `${progress * 100}%` }"></div>
        </div>
      </div>
      <div class="footer-text">
        <div>销售增长率</div>
        <div>34%</div>
      </div>
    </div>
  </div>
</template>

<script>
import ECharts from 'echarts'
export default {
  data() {
    return {
      circle: new Array(3),
      selectedIndex:0,
      progress:0.35
    };
  },
  methods:{
    
    change(index){
      this.selectedIndex=index
      this.genChart()
    },

    genChart(){
      //获取数据源
      const mockData=[];
      for(let i =0;i<10;i++){
        mockData.push(Math.floor(Math.random()*100)+200)
      }
      console.log(mockData);
      //获取chart对应的DOM
      const chartDom=document.getElementById('content-chart')
      //初始化echarts对象
      const chart=ECharts.init(chartDom)
      //生成渲染参数
      const options={
        xAxis:{
          type:"category",
          show:false
        },
        yAxis:{
          min:0,
          max:400,
          show:false
        }, 
        series:[{
          data:mockData,
          type:'line',
          smooth:true,
          areaStyle:{
            color:'rgba(75,193,252,.5)'
          },
          lineStyle:{
            width:4,
            color:'rgba(75,193,252,1)'
          },
          itemStyle:{
            borderWidth:8,
            color:'rgba(75,193,252,1)'
          }
        }],
        //grid设置让数据定格排列
          grid:{
            top:0,
            bottom:0,
            left:-30,
            right:-30
          },
          tooltip:{
            trigger:'axis',
            axisPointer:{
              type:'cross',
              label:{
                backgroundColor:'#6a7985'
              }
            }
          }
      }
      //渲染图表
      chart.setOption(options)
    }

  },
  mounted(){
    this.genChart()
    //循环播放
    this.task=setInterval(()=>{
      let index=this.selectedIndex
      index++
      if(index>this.circle.length){
        index=0
      }
      this.change(index)
    },3000)
  },
  //对页面进行修改时需要销毁前一次的定时器,防止内存泄露
  destroyed(){
    if(this.task){
      clearInterval(this.task)
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "index.scss";
</style>