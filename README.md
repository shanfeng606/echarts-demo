[点击预览](https://shanfeng606.github.io/echarts-demo/dist/)
[Ecahrts官网](https://echarts.apache.org/zh/index.html)

### 创建项目
安装Ecahrts依赖
`npm install echarts --save`

安装sass的两个依赖
`$cnpm i -D sass-loader node-sass`


<!--more-->

### 核心代码

```javascript
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

  methods:{   //切换函数，切换时重新执行一遍Echarts的图标渲染
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
          //鼠标移动时展示数据的效果
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
  mounted(){  //注意是在mounted中而不是在created中
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
```

### 额外补充
要是数据发生动态变化，则需要用到监听watch
```javascript
    watch: {
      //观察option的变化
      option: {
        handler(newVal, oldVal) {
          if (this.myChart) {
            if (newVal) {
              this.myChart.setOption(newVal);
            } else {
              this.myChart.setOption(oldVal); 
            }
          } else {
            this.init();
          }
        },
        deep: true //对象内部属性的监听，关键。
      },
    }
```