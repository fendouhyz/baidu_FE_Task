/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: '北京',
  nowGraTime: "day"
}
//Time radio 
var field = document.getElementById('form-gra-time');
//City select
var cityList = document.getElementById('city-select');
//
var aqiChartWrap = document.getElementsByClassName('aqi-chart-wrap')[0];
/**
 * 渲染图表
 */
function renderChart() {
  var color = '', text = '';
  for (str in chartData) {
    color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
    text += '<div title="'+str+":"+chartData[str]+'" style="height:'+chartData[str]+'px; background-color:'+color+'"></div>';
  }
  aqiChartWrap.innerHTML = text;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event); 
  var chooseTime = target.value;
  // 确定是否选项发生了变化 
  if(chooseTime === pageState.nowGraTime){
    return;
  }
  else{
    pageState.nowGraTime = chooseTime;
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
  console.log(chartData);
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(evnet) {
  // 确定是否选项发生了变化 
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event); 
  var chooseCity = target.value;
  // 设置对应数据
  if(chooseCity === pageState.nowSelectCity){
    return;
  }
  else{
    pageState.nowSelectCity = chooseCity;
  }
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
  console.log(chartData);
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  EventUtil.addHandler(field,'click',graTimeChange); 
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var insertText = '';
  for (var name in aqiSourceData){
    insertText += '<option>'+name+'</option>';
  }
  cityList.innerHTML = insertText;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  EventUtil.addHandler(cityList,'change',citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var srcData = aqiSourceData[pageState.nowSelectCity];
  var requestState = pageState.nowGraTime;
  if(requestState === 'day'){
    chartData = srcData;
  }
  else if(requestState === 'week'){
    chartData ={};
    var countSum = 0,dayCount = 0,weekCount = 0,weekAverg = 0;
    for(var item in srcData){
      var date_Week = (new Date(item)).getDay();
      if(date_Week !== 6){
        countSum += srcData[item];
        dayCount ++;
      }
      else{
        weekAverg = Math.floor(countSum/dayCount);
        chartData['第'+(weekCount+1)+'周'] = weekAverg;
        countSum = 0
        dayCount = 0;
        weekAverg = 0;
        weekCount++;
      }
    }
    if(dayCount !== 0){
      weekAverg = countSum/dayCount;
      chartData['第'+(weekCount+1)+'周'] = weekAverg;
    }
  }
  else if(requestState === 'month'){
    chartData = {};
    var countSum=0, daySum=0, month=0;
    for (var item in srcData) {
      var date_Month = (new Date(item)).getMonth();
     if(date_Month === month){
       countSum += srcData[item];
         daySum ++;
     }
      if (date_Month !== month) {
        month ++;
        chartData['第'+month+'月'] = Math.floor(countSum/daySum);
        countSum = srcData[item];
        daySum = 1;
      }
    }
    if (daySum != 0) {
      month ++;
      chartData['第'+month+'月'] = Math.floor(countSum/daySum);
    }//逻辑同周，不知道对不对
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();