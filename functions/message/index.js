// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数 //自定义客服回复功能
cloud.init()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event,'event')
  try {
    const result = await cloud.openapi.customerServiceMessage.send({
      touser: wxContext.OPENID,
      msgtype: 'text',
      text: {
        content: '欢迎来到辞典大全，我是您的客服小助手，正在快马加鞭去通知客服小哥哥（小姐姐），请稍后！'
      }
    })
    return result
  } catch (err) {
    return err
  }
}
