export default {
  dateFormat (thistime, fmt) {//日期格式化
    let $this = new Date(thistime)
    let o = {
      'M+': $this.getMonth() + 1,
      'd+': $this.getDate(),
      'h+': $this.getHours(),
      'm+': $this.getMinutes(),
      's+': $this.getSeconds(),
      'q+': Math.floor(($this.getMonth() + 3) / 3),
      'S': $this.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ($this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  },
  objNumValToStr (obj) {//把对象内为数字类型的值转换为字符串类型
    for (let key in obj) {
      if (typeof obj[key] === 'number') {
        obj[key] += '';
      }
    }
  },
}


