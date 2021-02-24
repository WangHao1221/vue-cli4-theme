/* eslint-disable */
export default {
    dateFormat(thistime, fmt) { // 日期格式化
        let fmt2 = fmt;
        const $this = new Date(thistime);
        const o = {
            'M+': $this.getMonth() + 1,
            'd+': $this.getDate(),
            'h+': $this.getHours(),
            'm+': $this.getMinutes(),
            's+': $this.getSeconds(),
            'q+': Math.floor(($this.getMonth() + 3) / 3),
            S: $this.getMilliseconds(),
        };
        if (/(y+)/.test(fmt2)) {
            fmt2 = fmt.replace(RegExp.$1, (`${$this.getFullYear()}`).substr(4 - RegExp.$1.length));
        }
        Object.keys(o).forEach((k) => {
            if (new RegExp(`(${k})`).test(fmt2)) {
                fmt2 = fmt2.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
            }
        });
        return fmt2;
    },
    objNumValToStr(obj) { // 把对象内为数字类型的值转换为字符串类型
        Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === 'number') {
                obj[key] += '';
            }
        });
    },
};