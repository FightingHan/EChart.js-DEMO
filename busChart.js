

function busChart(){
    var dom = document.getElementById("allmap");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    app.title = '北京公交路线 - 线特效';
    $.getJSON('line_bus.json', function(data) {
        var hStep = 300 / (data.length - 169);
        var busLines = [].concat.apply([], data.map(function (busLine, idx) {
            var prevPt;
            var points = [];
            for (var i = 0; i < busLine.length; i += 2) {
                var pt = [busLine[i], busLine[i + 1]];
                if (i > 0) {
                    pt = [
                        prevPt[0] + pt[0],
                        prevPt[1] + pt[1]
                    ];
                }
                prevPt = pt;
    
                points.push([pt[0] / 1e4, pt[1] / 1e4]);
            }
            return {
                coords: points,
                lineStyle: {
                    normal: {
                        color: echarts.color.modifyHSL('#6B7D9C', Math.round(hStep * idx))
                    }
                }
            };
        }));
        myChart.setOption(option = {
            bmap: {
                center: [116.46, 39.92],
                zoom: 12,
                roam: true,
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
            series: [{
                type: 'lines',
                coordinateSystem: 'bmap',
                polyline: true,
                data: busLines,
                silent: true,
                lineStyle: {
                    color: 'rgb(200, 35, 45)',
                    opacity: 0.2,
                    width: 1
                },
                progressiveThreshold: 500,
                progressive: 200
            }]
        });
    });
}