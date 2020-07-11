
function taxiChart(){
  // 初始化echart对象
  var myChart = echarts.init(document.getElementById('allmap'));
  $.get("test.json", function(data) {
      console.log(data);
      // 循环每条OD线，根据权重大小选择不同的颜色
      // 存放每条OD线
      let carlines = []
      for (let i=0; i< data.length; i++) {
          // 将json中的数据转化为echart可读取的格式
          let [flong, flat, tlong, tlat] = [data[i][0], data[i][1], data[i][2], data[i][3]]
          let points = [[flong, flat],[tlong, tlat]]
          let result = {
              coords: points,
              lineStyle: {
                  normal: {
                      color: getColor(data[i][4]),
                  }
              }
          }
          carlines.push(result)
      }
      // 获取对应权重的颜色
      function getColor(weight) {
          if (weight >15) {
              // 15以上：红色
              return "rgba(255, 0, 0, 1)"
          } else if (weight > 10) {
              // 11-15：浅紫色
              return "rgba(255, 187, 255, 1)"
          } else if (weight > 5) {
              // 6-10：绿色
              return "rgba(0, 255, 0, 0.8)"
          } else if (weight >= 1) {
              // 1-5：蓝色
              return "rgba(127, 255, 212, 0.3)"
          }
      }
      console.log(carlines);
      //构建series
      let series = [
        {
          type: 'lines',
          coordinateSystem: 'bmap',
          polyline: true,
          data: carlines,
          lineStyle: {
              normal: {
                  width: 0,
                  curveness: 0.5
              }
          },
          effect: {
              // 动点速度
              constantSpeed: 30,
              show: true,
              // 拖尾效果长度
              trailLength: 0.6,
              // 动点标识大小
              symbolSize: 2,
              // 线条颜色在data中指定
              // color: '#c23531'
          },
          zlevel: 1
        }
      ]
      let option = {
          bmap: {
          // 页面初始化时中心区域点
          center: [121.485372,31.236055],
          // 页面初始化时缩放程度
          zoom: 10,
          roam: true,
         // 百度地图自定义样式
          mapStyle: {
            'styleJson': [
              {
                'featureType': 'water',
                'elementType': 'all',
                'stylers': {
                  'color': '#031628'
                }
              },
              {
                'featureType': 'land',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#000102'
                }
              },
              {
                'featureType': 'highway',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              },
              {
                'featureType': 'arterial',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#000000'
                }
              },
              {
                'featureType': 'arterial',
                'elementType': 'geometry.stroke',
                'stylers': {
                  'color': '#0b3d51'
                }
              },
              {
                'featureType': 'local',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#000000'
                }
              },
              {
                'featureType': 'railway',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#000000'
                }
              },
              {
                'featureType': 'railway',
                'elementType': 'geometry.stroke',
                'stylers': {
                  'color': '#08304b'
                }
              },
              {
                'featureType': 'subway',
                'elementType': 'geometry',
                'stylers': {
                  'lightness': -70
                }
              },
              {
                'featureType': 'building',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#000000'
                }
              },
              {
                'featureType': 'all',
                'elementType': 'labels.text.fill',
                'stylers': {
                  'color': '#857f7f'
                }
              },
              {
                'featureType': 'all',
                'elementType': 'labels.text.stroke',
                'stylers': {
                  'color': '#000000'
                }
              },
              {
                'featureType': 'building',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#022338'
                }
              },
              {
                'featureType': 'green',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#062032'
                }
              },
              {
                'featureType': 'boundary',
                'elementType': 'all',
                'stylers': {
                  'color': '#465b6c'
                }
              },
              {
                'featureType': 'manmade',
                'elementType': 'all',
                'stylers': {
                  'color': '#022338'
                }
              },
              {
                'featureType': 'label',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              }
            ]
          }
          },
          series: series
      }
      myChart.setOption(option)
      
  })
}