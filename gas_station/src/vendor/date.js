function formatDate (date) {
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  var newDate = y + '-' + m + '-' + d
  return newDate
}
function getTime (AddDayCount) {
  var dd = new Date();
  dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
  let y = dd.getFullYear();
  let m = dd.getMonth()+1;//获取当前月份的日期
  let d = dd.getDate();
  return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d);
}
export  {formatDate, getTime}
