const formatTime = (date,sign = '') => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join(sign);
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function spli(str) {
  var xiaoshu = '',zhengshu = '';
  if(str.indexOf(".") !== -1){
    zhengshu = str.split(".")[0];
    xiaoshu = str.split(".")[1];
    str = zhengshu;
  }
  var iNum = str.length % 3;//->0,1,2
  var prev = '';
  var arr = [];
  var iNow = 0;
  var tmp = '';
  //千分号是从后向前三位三位加的，所以把三位余出来的从前面提取到
  if (iNum != 0) {
    prev = str.substring(0, iNum);
    arr.push(prev);
  }
  //取到多余部分后面的
  str = str.substring(iNum);
  for (var i = 0; i < str.length; i++) {
    iNow++;
    tmp += str[i];
    if (iNow == 3 && tmp) {
      //数组里面放的是三位的数
      arr.push(tmp);
      tmp = '';
      iNow = 0;
    }
  }
  if (xiaoshu){
    return arr.join(',')+"."+ xiaoshu;
  }else{
    return arr.join(',');
  }
}
module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  spli: spli
}
