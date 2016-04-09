/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
/**
*定义了一个对象
*记录每一次操作aqiData的相关数据

**/
var handleAqiData = {
    "cityName" :null,//插入城市名字
    "aqiValue" :null,//插入空气质量数字
    "deletIndex" :null,//删除表格的行数
    "insertStatus" :false,//是否插入数据
    "deleteStatus" :false,//是否删除数据
};
var table = document.getElementById("aqi-table");
/**
* 检查输入的合法性
  返回值：[输入正确：0，
           城市名输入为空： 1，
           空气质量输入为空： 2，
           两者均为空：3，
           城市名不合法： 4 ，
           空气质量不合法：5，
           两者均不合法： 6]

**/
function checkInput(cityName,aqiValue){
    var Result = 0; 
    var notBrankReg = /^[\u4E00-\u9FA5\uF900-\uFA2D\w\S]+$/;
    if(!notBrankReg.test(cityName)){
        Result = 1;
    }
    if(!notBrankReg.test(aqiValue)){
        Result = 2;
    }
    if(!notBrankReg.test(cityName) && !notBrankReg.test(aqiValue)){
        Result = 3;
    }
    if(Result != 0){
        return Result;
    }
    var cityNameReg = /[^(\u4E00-\u9FA5\uF900-\uFA2Da-zA-Z)]/;
    var aqiValueReg = /[^(0-9)]/;
    if(cityName.search(cityNameReg)!=-1){
        Result = 4;
    }
    if(aqiValue.search(aqiValueReg)!=-1){
        Result = 5;
    }
    if(cityName.search(cityNameReg)!=-1 && aqiValue.search(aqiValueReg)!=-1){
        Result = 6;
    }
    return Result;
}
 /**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {

    var cityName = document.getElementById("aqi-city-input");
    var aqiValue = document.getElementById("aqi-value-input");
    var cityNameStr = cityName.value.trim();
    var aqiValueStr = aqiValue.value.trim();
    var checkResult = checkInput(cityNameStr,aqiValueStr);

    var name_tips = document.getElementById("city-name-inputTips");
    var value_tips = document.getElementById("aqi-value-inputTips");
    var nameTips = "";
    var valueTips ="";
    name_tips.innerHTML= nameTips;
    value_tips.innerHTML = valueTips;

    if(checkResult == 0){
        aqiData[cityNameStr] = parseInt(aqiValueStr);
        //对handleAqiData的属性赋值
        handleAqiData.cityName = cityNameStr;
        handleAqiData.aqiValue = aqiData[cityNameStr];
        handleAqiData.insertStatus = true;
        handleAqiData.deleteStatus = false;
        cityName.value = null;
        aqiValue.value = null;
        console.log("insertSucc");
    }
    else{
        handleAqiData.insertStatus = false;
        handleAqiData.deleteStatus = false;
        switch(checkResult){
            case 1:
                nameTips = "城市名不能为空";
                valueTips = "";
                break;
            case 2:
                nameTips = "";
                valueTips = "空气质量值不能为空";
                break;
            case 3:
                nameTips = "城市名不能为空";
                valueTips = "空气质量值不能为空";
                break;
            case 4:
                nameTips = "城市名必须为中英文字符";
                valueTips = "";
                break;
            case 5:
                nameTips = "";
                valueTips = "空气质量之必须为整数";
                break;
            case 6:
                nameTips = "城市名必须为中英文字符";
                valueTips = "空气质量之必须为整数";
                break;
        }
        name_tips.innerHTML= nameTips;
        value_tips.innerHTML = valueTips;
        name_tips.style.color = "red";
        value_tips.style.color = "red";
        console.log("insertFaild");
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    if(handleAqiData.insertStatus){
        table.innerHTML += "<tr><td>" + handleAqiData.cityName + "</td><td>" + handleAqiData.aqiValue + "</td><td><button>删除</button></td>";
    }
    if(handleAqiData.deleteStatus){
        table.deleteRow(handleAqiData.deletIndex);
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    handleAqiData.insertStatus = false;
    handleAqiData.deleteStatus = false;
    addAqiData();
    renderAqiList();
    console.log(aqiData);
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
  // do sth.
  handleAqiData.insertStatus = false;
  handleAqiData.deleteStatus = false;
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);
  var tr = target.parentNode.parentNode;
  var deleCity = tr.children[0].innerHTML;
  var deleValue = tr.children[1].innerHTML;
  if(parseInt(deleValue) == aqiData[deleCity]){
    delete aqiData[deleCity];
  }
  handleAqiData.deletIndex = tr.rowIndex;
  handleAqiData.deleteStatus = true;
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addBtn = document.getElementById("add-btn");
  addBtn.onclick = addBtnHandle;

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  EventUtil.addHandler(table,"click",delBtnHandle);
}

init();