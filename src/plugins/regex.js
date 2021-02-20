export default {
  userNameReg(str) {
    const reg = /^[A-Za-z-0-9_-]{4,30}$/; // 账号名只能为数字、英文字母(不区分大小写)、"_"、"-"，其他字符不可以使用，用户名为4-30位字符
    return reg.test(str.trim());
  },
  passWordReg(str) {
    // const reg = /^[A-Za-z-0-9_-]{6,16}$/;  //密码只能为数字、英文字母(区分大小写)、"_"、"-"，其他字符不可以使用，密码为6-16位字符！
    const reg = /^[\u4e00-\u9fa5]/; // 中文,,需求是除中文之外的字符都可以
    return reg.test(str.trim());
  },
  nameReg(str) {
    const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/; // 中文下划线数组英文
    return reg.test(str.trim());
  },
  nameRegEx(str) {
    const reg = /^([\u4E00-\uFA29]*[a-z]*[A-Z]*)+$/; // 中文，英文
    return reg.test(str.trim());
  },
  numberAndEnglishRegEx(str) {
    const reg = /^([a-z]*[A-Z]*[0-9]*)+$/; // 英文，数字
    return reg.test(str.trim());
  },
  englishRegEx(str) {
    const reg = /^([a-z]*[A-Z]*)+$/; // 英文
    return reg.test(str.trim());
  },
  priceRegEx(str) {
    const reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/; // 非负整数或小数，小数最多精确到小数点后两位
    return reg.test(str.trim());
  },
  numberReg(str) {
    const reg = /^[0-9]*$/; // 数字
    return reg.test(str.trim());
  },
  telRegEx(str) {
    const reg = /^(1[3456789]\d{9})$/; // 手机号
    return reg.test(str.trim());
  },
  idCardRegEx(str) {
    // const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  //身份证
    const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/; // 身份证
    return reg.test(str.trim());
  },
  emailReg(str) {
    const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/; // 邮箱
    return reg.test(str.trim());
  },
};
