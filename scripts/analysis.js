document.addEventListener('DOMContentLoaded', () => {
    function analysis() {
        let analysisurl = "http://127.0.0.1:8889/api/v1.0/plist/filter/analysis"

        fetch(analysisurl, {
            method: 'POST',
            body: JSON.stringify(window.localStorage.getItem('asinList').split(','))
        })
            .catch(error => console.error('Error:', error))
            .then(response => response.json())
            .then(response => {
                //解析JSON 替换画图
                console.log('Success:', response);

                var tiltehead = "【鹰眼数据】"
                var theme = 'dark'  //vintage dark halloween shine westeros essos wonderland walden chalk infographic macarons roma purple-passion
                painting_ask(response.ask, theme);
                painting_bullets_kw(response.bullets_kw, theme);
                painting_rank_clevels(response.rank_clevels, theme);

                painting_date(response.date, theme);
                painting_defaultreview_hs(response.defaultreview_hs, theme);
                painting_defaultreview_sh(response.defaultreview_sh, theme);

                painting_flag(response.flag, response.total, theme);
                painting_genmai_num(response.genmai_num, response.total, theme);
                painting_sweight(response.sweight, response.total, theme);
                painting_price(response.price, response.total, theme);
                painting_review_star(response.review_star, response.total, theme);
                painting_reviews(response.reviews, response.total, theme);
                painting_shipping(response.shipping, response.total, theme);
                painting_star(response.star, response.total, theme);

                painting_variation_count(response.variation_count, response.total, theme);

                painting_keyword(response.keyword, theme);
                painting_feature(response.feature, theme);
                painting_variation(response.variation, theme);
                painting_category_tree(response.painting_tree, 'vintage');
            });
    }


    function painting_variation_count(data, total, theme) {
        console.log('painting_variation_count:', data);
        var myChart = echarts.init(document.getElementById('variation_count'), theme);
        var option = {
            title: {
                text: '变体数量分布'
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: false, readOnly: false },
                    saveAsImage: { show: true }
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{c} ({d}%)"
            },
            legend: {
                bottom: 10,
                left: 'center',
                data: ["无", "1<=vc<3", "3<=vc<5", "5<=vc<8", "8<=vc"]
            },
            series: [{
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                label: {            //饼图图形上的文本标签
                    normal: {
                        show: true,
                        position: 'outside', //标签的位置  inner inside outside
                        textStyle: {
                            fontWeight: 300,
                            fontSize: 16    //文字的字体大小
                        },
                        formatter: "{b}\n({d}%)"
                    }
                },
                data: [
                    { value: data["==0"], name: '无' },
                    { value: data["1<=vc<3"], name: '1<=vc<3' },
                    { value: data["3<=vc<5"], name: '3<=vc<5' },
                    { value: data["5<=vc<8"], name: '5<=vc<8' },
                    { value: data["8<=vc"], name: '8<=vc' },
                ]
            }]
        };
        myChart.setOption(option);
    }

    function painting_ask(data, theme) {
        console.log('painting_ask:', data)
        var myChart = echarts.init(document.getElementById('ask'), theme);
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '问答数量分布'
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: false, readOnly: false },
                    saveAsImage: { show: true }
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{c} ({d}%)"
            },
            legend: {
                bottom: 10,
                left: 'center',
                data: ["0<=n<10", "10<=n<50", "50<=n<100", "100<=n<200", "200<=n<500", "1000<=n"]
            },
            series: [{
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                label: {            //饼图图形上的文本标签
                    normal: {
                        show: true,
                        position: 'outside', //标签的位置  inner inside outside
                        textStyle: {
                            fontWeight: 300,
                            fontSize: 16    //文字的字体大小
                        },
                        formatter: "{b}\n({d}%)"
                    }
                },
                data: [
                    { value: data["0<=a<10"], name: '0<=n<10' },
                    { value: data["10<=a<50"], name: '0<=n<10' },
                    { value: data["50<=a<100"], name: '50<=n<100' },
                    { value: data["100<=a<200"], name: '100<=n<200' },
                    { value: data["200<=a<500"], name: '1000<=n' },
                ]
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    function painting_bullets_kw(data, theme) {
        console.log('painting_bullets_kw:', data)
        var canvas = document.getElementById('bullets_kw_canvas');
        var options = eval({
            "list": data,//或者[['各位观众',45],['词云', 21],['来啦!!!',13]],只要格式满足这样都可以
            "gridSize": 12, // 密集程度 数字越小越密集
            "weightFactor": 0.1, // 字体大小=原始大小*weightFactor
            "maxFontSize": 60, //最大字号
            "minFontSize": 2, //最小字号
            "fontWeight": 'normal', //字体粗细
            "fontFamily": 'Times, serif', // 字体
            "color": 'random-light', // 字体颜色 'random-dark' 或者 'random-light'
            "backgroundColor": '#333', // 背景颜色
            "rotateRatio": 0 // 字体倾斜(旋转)概率，1代表总是倾斜(旋转)
        });
        //生成
        WordCloud(canvas, options);
    }

    function painting_rank_clevels(data, theme) {
        console.log('rank_clevels:', data);
        var myChart = echarts.init(document.getElementById('rank_clevels'), theme);
        var option = {
            title: {
                text: 'BestSeller排名分布'
            },
            legend: {
                data: ['1<=r<=100', '100<r<=500', '500<r<=1000', '1000<r<=5000']
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: false, readOnly: false },
                    saveAsImage: { show: true }
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis'
            },
            dataset: {
                dimensions: ['name', '1<=r<=100', '100<r<=500', '500<r<=1000', '1000<r<=5000'],
                source: data
            },
            xAxis: { type: 'category' },
            yAxis: { type: 'value' },
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                { type: 'bar', label: { show: true, position: 'top', fontSize: 16 } },
                { type: 'bar', label: { show: true, position: 'top', fontSize: 16 } },
                { type: 'bar', label: { show: true, position: 'top', fontSize: 16 } },
                { type: 'bar', label: { show: true, position: 'top', fontSize: 16 } },
            ]
        };
        myChart.setOption(option);
    }

    function painting_date(data, theme) {
        console.log('painting_date:', data);
        var myChart = echarts.init(document.getElementById('date'), theme);
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '上架时间分布(月)'
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: false, readOnly: false },
                    saveAsImage: { show: true }
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{c} ({d}%)"
            },
            legend: {
                bottom: 10,
                left: 'center',
                data: ["0<d<1", "1<=d<3", "3<=d<6", "6<=d<12", "12<=d<24", "24<=", "unknow"]
            },
            series: [{
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                label: {            //饼图图形上的文本标签
                    normal: {
                        show: true,
                        position: 'outside', //标签的位置  inner inside outside
                        textStyle: {
                            fontWeight: 300,
                            fontSize: 16    //文字的字体大小
                        },
                        formatter: "{b}\n({d}%)"
                    }
                },
                data: [
                    { value: data["0<d<1"], name: '0<d<1' },
                    { value: data["1<=d<3"], name: '1<=d<3' },
                    { value: data["3<=d<6"], name: '3<=d<6' },
                    { value: data["6<=d<12"], name: '6<=d<12' },
                    { value: data["12<=d<24"], name: '12<=d<24' },
                    { value: data["24<="], name: '24<=' },
                    { value: data["unk"], name: 'unknow' },
                ]
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    function painting_defaultreview(data, theme) {
        console.log('data:', data);
    }
    function painting_defaultreview_hs(data, theme) {
        console.log('defaultreview_hs:', data);
        var myChart = echarts.init(document.getElementById('defaultreview_hs'), theme);
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '首页rewiew helpful分布'
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: false, readOnly: false },
                    saveAsImage: { show: true }
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{c} ({d}%)"
            },
            legend: {
                bottom: 10,
                left: 'center',
                data: ["helpful=0", "1<=helpful<10", "10<=helpful<100", "100<=helpful"]
            },
            series: [{
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                label: {            //饼图图形上的文本标签
                    normal: {
                        show: true,
                        position: 'outside', //标签的位置  inner inside outside
                        textStyle: {
                            fontWeight: 300,
                            fontSize: 16    //文字的字体大小
                        },
                        formatter: "{b}\n({d}%)"
                    }
                },
                data: [
                    { value: data["h0"], name: 'helpful=0' },
                    { value: data["h_1_10"], name: '1<=helpful<10' },
                    { value: data["h_10_100"], name: '10<=helpful<100' },
                    { value: data["h_100_"], name: '100<=helpful' },
                ]
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    function painting_defaultreview_sh(data, theme) {
        console.log('defaultreview_sh:', data);
        var myChart = echarts.init(document.getElementById('defaultreview_sh'), theme);
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '首页rewiew star分布'
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: false, readOnly: false },
                    saveAsImage: { show: true }
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{c} ({d}%)"
            },
            legend: {
                bottom: 10,
                left: 'center',
                data: ["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"]
            },
            series: [{
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                label: {            //饼图图形上的文本标签
                    normal: {
                        show: true,
                        position: 'outside', //标签的位置  inner inside outside
                        textStyle: {
                            fontWeight: 300,
                            fontSize: 16    //文字的字体大小
                        },
                        formatter: "{b}\n({d}%)"
                    }
                },
                data: [
                    { value: data["1s"], name: '1 Star' },
                    { value: data["2s"], name: '2 Star' },
                    { value: data["3s"], name: '3 Star' },
                    { value: data["4s"], name: '4 Star' },
                    { value: data["5s"], name: '5 Star' },
                ]
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    function painting_feature(data, theme) {
        console.log('painting_feature:', data);
        var canvas = document.getElementById('feature_kw_canvas');
        var options = eval({
            "list": data,//或者[['各位观众',45],['词云', 21],['来啦!!!',13]],只要格式满足这样都可以
            "gridSize": 15, // 密集程度 数字越小越密集
            "weightFactor": 0.2, // 字体大小=原始大小*weightFactor
            "maxFontSize": 40, //最大字号
            "minFontSize": 12, //最小字号
            "fontWeight": 'normal', //字体粗细
            "fontFamily": 'Times, serif', // 字体
            "color": 'random-light', // 字体颜色 'random-dark' 或者 'random-light'
            "backgroundColor": '#333', // 背景颜色
            "rotateRatio": 0 // 字体倾斜(旋转)概率，1代表总是倾斜(旋转)
        });
        WordCloud(canvas, options);
    }

    function painting_flag(data, total, theme) {
        console.log('painting_flag:', data);
        var myChart = echarts.init(document.getElementById('flag'), theme);
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '特性分布'
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: false, readOnly: false },
                    saveAsImage: { show: true }
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            legend: {
                data: ['数量']
            },
            xAxis: {
                type: 'category',
                data: ["总数", "卖家", "品牌",
                    "A+", "achoice", "Best", "Btogether",
                    "Coupon", "跟卖", "主图视频", "图片review", "视频review"],
            },
            yAxis: {
                type: 'value',
            },
            series: [{
                name: '数量',
                type: 'bar',
                label: {
                    show: true,
                    position: 'top',
                    formatter: "{c}",
                    fontSize: 12 //default 12
                },
                itemStyle: {
                    normal: {
                        // 随机显示
                        //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                        // 定制显示（按顺序）
                        color: function (params) {
                            var colorList = ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78',
                                '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42', '#4A235A'];
                            //var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', 
                            //                '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F',
                            //                '#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                            return colorList[params.dataIndex]
                        }
                    },
                },
                data: [total, data["soldby"], data["band"],
                    data["aplus"], data["achoice"], data["best"], data["btogether"],
                    data["coupon"], data["genmai"], data["pvideo"], data["image"], data["video"]]
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    function painting_genmai_num(data, total, theme) {
        console.log('painting_genmai_num:', data);
        var myChart = echarts.init(document.getElementById('genmai_num'), theme);
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '跟卖分布'
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: false, readOnly: false },
                    //magicType : {show: true, type: ['line', 'bar']},
                    //restore : {show: true},
                    saveAsImage: { show: true }
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            legend: {
                data: ['数量']
            },
            xAxis: {
                type: 'category',
                data: ["总数", "1<=n<2", "2<=n<5", "5<=n<10", "10<=n", "=0"],
                /*        
                boundaryGap: [0, 0.01],
                axisLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                }   
                */
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '数量',
                type: 'bar',
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 16 //default 12
                },
                itemStyle: {
                    normal: {
                        // 随机显示
                        //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                        // 定制显示（按顺序）
                        color: function (params) {
                            var colorList = ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78',
                                '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42', '#333333'];
                            //var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', 
                            //                '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F',
                            //                '#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                            return colorList[params.dataIndex]
                        }
                    },
                },
                data: [total, data["1<=gn<2"], data["2<=gn<5"], data["5<=gn<10"], data["10<=gn"], data["==0"]]
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    function painting_iweight(data, theme) {
    }

    function painting_keyword(data, theme) {
        console.log('painting_keyword:', data);
        var canvas = document.getElementById('name_kw_canvas');
        var options = eval({
            "list": data,//或者[['各位观众',45],['词云', 21],['来啦!!!',13]],只要格式满足这样都可以
            "gridSize": 15, // 密集程度 数字越小越密集
            "weightFactor": 0.2, // 字体大小=原始大小*weightFactor
            "maxFontSize": 40, //最大字号
            "minFontSize": 12, //最小字号
            "fontWeight": 'normal', //字体粗细
            "fontFamily": 'Times, serif', // 字体
            "color": 'random-light', // 字体颜色 'random-dark' 或者 'random-light'
            "backgroundColor": '#333', // 背景颜色
            "rotateRatio": 0 // 字体倾斜(旋转)概率，1代表总是倾斜(旋转)
        });
        WordCloud(canvas, options);
    }

    function painting_price(data, total, theme) {
        console.log('painting_price:', data, total);
        var myChart = echarts.init(document.getElementById('price'), theme);
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: this.tiltehead + '价格分布($)'
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: false, readOnly: false },
                    saveAsImage: { show: true }
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{c} ({d}%)"
            },
            legend: {
                bottom: 10,
                left: 'center',
                data: ["0<p<10", "10<=p<20", "20<=p<30", "30<=p<40", "40<=p<50", "50<=p<100",
                    "100<=p<200", "200<=p<500", "500<=p<1000", "1000<=p"]
            },
            series: [{
                type: 'pie',
                radius: '60%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                label: {            //饼图图形上的文本标签
                    normal: {
                        show: true,
                        position: 'outside', //标签的位置  inner inside outside
                        textStyle: {
                            fontWeight: 300,
                            fontSize: 16    //文字的字体大小
                        },
                        formatter: "{b}\n({d}%)"
                    }
                },
                data: [
                    { value: data["0<p<10"], name: '0<p<10' },
                    { value: data["10<=p<20"], name: '10<=p<20' },
                    { value: data["20<=p<30"], name: '20<=p<30' },
                    { value: data["30<=p<40"], name: '30<=p<40' },
                    { value: data["40<=p<50"], name: '40<=p<50' },
                    { value: data["50<=p<100"], name: '50<=p<100' },
                    { value: data["100<=p<200"], name: '100<=p<200' },
                    { value: data["200<=p<500"], name: '200<=p<500' },
                    { value: data["500<=p<1000"], name: "500<=p<1000" },
                    { value: data["1000<=p"], name: "1000<=p" },
                ]
            }]
            /*               
            tooltip: {},
            legend: {
                data: ['数量']
            },
            xAxis: {
                type: 'category',
                data: ["总数","0<=p<10","10<=p<20","20<=p<30","30<=p<40","40<=p<50","50<=p<100",
                        "100<=p<200","200<=p<500","500<=p<1000","1000<=p"],
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '数量',
                type: 'bar',
                data: [total, data["0<=p<10"], data["10<=p<20"], data["20<=p<30"], data["30<=p<40"], data["40<=p<50"], 
                                data["50<=p<100"], data["100<=p<200"], data["200<=p<500"], data["500<=p<1000"], data["1000<=p"]]
            }]
            */
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    function painting_review_star(data, total, theme) {
        console.log('painting_review_star:', data, total);
        var myChart = echarts.init(document.getElementById('review_star'), theme);
        var option = {
            title: {
                text: 'reviews星级分布'
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: false, readOnly: false },
                    saveAsImage: { show: true }
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{c} ({d}%)"
            },
            legend: {
                bottom: 10,
                left: 'center',
                data: ["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"]
            },
            series: [{
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                label: {            //饼图图形上的文本标签
                    normal: {
                        show: true,
                        position: 'outside', //标签的位置  inner inside outside
                        textStyle: {
                            fontWeight: 300,
                            fontSize: 16    //文字的字体大小
                        },
                        formatter: "{b}\n({d}%)"
                    }
                },
                data: [
                    { value: data["1s"], name: '1 Star' },
                    { value: data["2s"], name: '2 Star' },
                    { value: data["3s"], name: '3 Star' },
                    { value: data["4s"], name: '4 Star' },
                    { value: data["5s"], name: '5 Star' },
                ]
            }]
        };
        myChart.setOption(option);
    }
    function painting_reviews(data, total, theme) {
        console.log('painting_reviews:', data, total);
        var myChart = echarts.init(document.getElementById('reviews'), theme);
        var option = {
            title: {
                text: 'reviews数量分布'
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: false, readOnly: false },
                    saveAsImage: { show: true }
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{c} ({d}%)"
            },
            legend: {
                bottom: 10,
                left: 'center',
                data: ["0<=r<10", "10<=r<50", "50<=r<100", "100<=r<200", "200<=r<500", "1000<=r"]
            },
            series: [{
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                label: {            //饼图图形上的文本标签
                    normal: {
                        show: true,
                        position: 'outside', //标签的位置  inner inside outside
                        textStyle: {
                            fontWeight: 300,
                            fontSize: 16    //文字的字体大小
                        },
                        formatter: "{b}\n({d}%)"
                    }
                },
                data: [
                    { value: data["0<=r<10"], name: '0<=r<10' },
                    { value: data["10<=r<50"], name: '10<=r<50' },
                    { value: data["50<=r<100"], name: '50<=r<100' },
                    { value: data["100<=r<200"], name: '100<=r<200' },
                    { value: data["200<=r<500"], name: '200<=r<500' },
                    { value: data["1000<=r"], name: '1000<=r' },
                ]
            }]
        };
        myChart.setOption(option);
    }
    function painting_shipping(data, total, theme) {
        console.log('painting_shipping:', data, total);
        var myChart = echarts.init(document.getElementById('shipping'), theme);
        var option = {
            title: {
                text: '物流分布'
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: false, readOnly: false },
                    saveAsImage: { show: true }
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{c} ({d}%)"
            },
            legend: {
                bottom: 10,
                left: 'center',
                data: ["Amazon", "FBA", "FBM", "Unknow"]
            },
            series: [{
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                label: {            //饼图图形上的文本标签
                    normal: {
                        show: true,
                        position: 'outside', //标签的位置  inner inside outside
                        textStyle: {
                            fontWeight: 300,
                            fontSize: 16    //文字的字体大小
                        },
                        formatter: "{b}\n({d}%)"
                    }
                },
                data: [
                    { value: data["Amazon"], name: 'Amazon' },
                    { value: data["FBA"], name: 'FBA' },
                    { value: data["FBM"], name: 'FBM' },
                    { value: data["Unknow"], name: 'Unknow' },
                ]
            }]
        };
        myChart.setOption(option);
    }
    function painting_star(data, total, theme) {
        console.log('painting_star:', data, total);
        var myChart = echarts.init(document.getElementById('star'), theme);
        var option = {
            title: {
                text: '评分分布'
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: false, readOnly: false },
                    saveAsImage: { show: true }
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{c} ({d}%)"
            },
            legend: {
                bottom: 10,
                left: 'center',
                data: ["0<=s<3", "3<=s<3.5", "3.5<=s<4", "4<=s<4.5", "4.5<=s<5"]
            },
            series: [{
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                label: {            //饼图图形上的文本标签
                    normal: {
                        show: true,
                        position: 'outside', //标签的位置  inner inside outside
                        textStyle: {
                            fontWeight: 300,
                            fontSize: 16    //文字的字体大小
                        },
                        formatter: "{b}\n({d}%)"
                    }
                },
                data: [
                    { value: data["0<=s<3"], name: '0<=s<3' },
                    { value: data["3<=s<3.5"], name: '3<=s<3.5' },
                    { value: data["3.5<=s<4"], name: '3.5<=s<4' },
                    { value: data["4<=s<4.5"], name: '4<=s<4.5' },
                    { value: data["4.5<=s<5"], name: '4.5<=s<5' },
                ]
            }]
        };
        myChart.setOption(option);
    }
    function painting_sweight(data, total, theme) {
        console.log('painting_sweight:', data);
        var myChart = echarts.init(document.getElementById('sweight'), theme);
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '发货重量分布(盎司)'
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: false, readOnly: false },
                    //magicType : {show: true, type: ['line', 'bar']},
                    //restore : {show: true},
                    saveAsImage: { show: true }
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            legend: {
                data: ['数量']
            },
            xAxis: {
                type: 'category',
                data: ["总数", "0<=w<5", "5<=w<10", "10<=w<15", "15<=w<20", "20<=w<30", "30<=w<40",
                    "40<=w<50", "50<=w<100", "100<=w", "Unknow"],
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '数量',
                type: 'bar',
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 12 //default 12
                },
                itemStyle: {
                    normal: {
                        // 随机显示
                        //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                        // 定制显示（按顺序）
                        color: function (params) {
                            var colorList = ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78',
                                '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42', '#333333'];
                            //var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', 
                            //                '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F',
                            //                '#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                            return colorList[params.dataIndex]
                        }
                    },
                },
                data: [total, data["0<=sw<5"], data["5<=sw<10"], data["10<=sw<15"], data["15<=sw<20"], data["20<=sw<30"],
                    data["30<=sw<40"], data["40<=sw<50"], data["50<=sw<100"], data["100<=sw"], data["unk"]]
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    function painting_top(data, theme) {
    }
    function painting_total(data, theme) {
    }
    function painting_variation(data, theme) {
        console.log('painting_variation:', data);
        var canvas = document.getElementById('variation_canvas');
        var options = eval({
            "list": data,//或者[['各位观众',45],['词云', 21],['来啦!!!',13]],只要格式满足这样都可以
            "gridSize": 15, // 密集程度 数字越小越密集
            "weightFactor": 5, // 字体大小=原始大小*weightFactor
            "maxFontSize": 60, //最大字号
            "minFontSize": 35, //最小字号
            "fontWeight": 'normal', //字体粗细
            "fontFamily": 'Times, serif', // 字体
            "color": 'random-light', // 字体颜色 'random-dark' 或者 'random-light'
            "backgroundColor": '#333', // 背景颜色
            "rotateRatio": 0 // 字体倾斜(旋转)概率，1代表总是倾斜(旋转)
        });
        WordCloud(canvas, options);
    }

    function painting_category_tree(data, theme) {
        console.log('painting_category_tree:', data)
        /*
        var waterMarkText = 'ECHARTS';
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = canvas.height = 100;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = 0.08;
        ctx.font = '20px Microsoft Yahei';
        ctx.translate(50, 50);
        ctx.rotate(-Math.PI / 4);
        ctx.fillText(waterMarkText, 0, 0);
        */
        var max_depth = 0;
        for (var index in data) {
            if (data[index].painting_tree.depth > max_depth)
                max_depth = data[index].painting_tree.depth
        }
        console.log('max_depth:', max_depth)

        var category_tree = document.getElementById('category_tree');
        var ptree_width;
        var div, br;
        var category;
        var twidth = 0, theight = 0;
        for (var index in data) {
            category = data[index]
            //console.log('category:', category)
            ptree_width = category.painting_tree.width * 40 > 100 ? category.painting_tree.width * 40 : 100
            div = document.createElement("div");
            div.setAttribute('id', 'category_tree' + index);
            div.style.width = '100%'
            // max_depth * 200 + 'px';
            div.style.height = 
            ptree_width + 'px';
            if (twidth < max_depth * 200) {
                twidth = max_depth * 200;
            }
            theight += ptree_width;
            category_tree.appendChild(div);

            var myChart = echarts.init(document.getElementById('category_tree' + index), theme);
            option = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: { show: false, readOnly: false },
                        //magicType : {show: true, type: ['line', 'bar']},
                        //restore : {show: true},
                        saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                        nodeGap: 22,
                        nodeAlign: 'justify',  //justify right  left
                        type: 'sankey',
                        data: category.painting_tree.nodes,
                        links: category.painting_tree.links,
                        focusNodeAdjacency: 'allEdges',
                        itemStyle: {
                            normal: {
                                borderWidth: 1,
                                borderColor: '#aaa'
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: 'source',
                                curveness: 0.5
                            }
                        }
                    }
                ]
            }
            myChart.setOption(option);
        }
        // category_tree.style.width = twidth + 'px';
        // category_tree.style.height = theight + 'px';
    }


    /*
    source: [
        ['category', 'subnode["cname"]', '2013', '2014', '2015', '2016', '2017'],
        ['1<=r<=100', subnode["1<=r<=100"], 30.4, 65.1, 53.3, 83.8, 98.7],
        ['100<r<=500', subnode["100<r<=500"], 92.1, 85.7, 83.1, 73.4, 55.1],
        ['500<r<=1000', subnode["500<r<=1000"], 67.2, 79.5, 86.4, 65.2, 82.5],
        ['1000<r', subnode["1000<r"], 67.1, 69.2, 72.4, 53.9, 39.1]
    ]
    
    var magic = 2;
    var width = 1600;
    var column_max = 5;
    var offset = 200;
    var column = 0;  // 列数
    var row = 0;   //行数
    var radius = 120;
    var cname = ["category"];
    var r_1_100 = ["1<=r<=100"];
    var r_100_500 = ["100<r<=500"];
    var r_500_1000 = ["500<r<=1000"];
    var r_1000_ = ["1000<r"];
    var source = [cname, r_1_100, r_100_500, r_500_1000, r_1000_];
    var series = [];

    var total_count = 0;
    for(var category in data){            
        for(var index in data[category]){  
            for(var level_catogry in data[category][index]){  
                var subnode = data[category][index][level_catogry];
                if (subnode["1<=r<=100"] + subnode["100<r<=500"] + subnode["500<r<=1000"] + subnode["1000<r"] >= magic){
                    total_count++;
                }
            }
        }
    }
    var dom = document.getElementById("rank_root_tree");
    dom.style.width = width + 'px';
    dom.style.height = radius + ((total_count+column_max-1)/column_max)*(radius*2 + offset) + 'px';

    for(var category in data){            
        //console.log('data[category]:', category, data[category]);
        for(var index in data[category]){  
            //console.log('data[category][index]:', index, data[category][index]);
            for(var level_catogry in data[category][index]){  
                //console.log('data[category][index][level_catogry]:', level_catogry, data[category][index][level_catogry]);
                var subnode = data[category][index][level_catogry];
                if (subnode["1<=r<=100"] + subnode["100<r<=500"] + subnode["500<r<=1000"] + subnode["1000<r"] >= magic){
                    cname.push(subnode["cname"]);
                    r_1_100.push(subnode["1<=r<=100"]);
                    r_100_500.push(subnode["100<r<=500"]);
                    r_500_1000.push(subnode["500<r<=1000"]);
                    r_1000_.push(subnode["1000<r"]);
                    
                    var series_item = { type:'pie', 
                                        name: subnode["cname"],
                                        radius:radius, 
                                        label:{
                                            show: true,
                                        },
                                        center:[(width/column_max)/2 + (width/column_max)*column, radius + (radius*2)*row + offset*(row+1)],  // + '%'
                                        //center:[25 + 50*(column%2) + '%', radius + (radius*2)*row + offset*(row+1)],  // + '%'
                                        encode: {
                                                itemName: 'category',
                                                value: subnode["cname"]
                                        }};
                    series.push(series_item)

                    column++;
                    if(column%column_max == 0){
                        column = 0;
                        row++;
                    }
                }
            }          
        }          
    }

    var myChart = echarts.init(dom);
    option = null;
    var option = {
        title : {
            text: '类目排名分布',
        },      
        legend: {},
        tooltip: {},
        dataset: {
            source: source
        },
        series: series
    };;
    console.log('option:', option);
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
    */

    analysis()
})