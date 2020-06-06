// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数 //自定义客服回复功能
cloud.init()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event,'event')
  try {
    // const result =
    await cloud.openapi.customerServiceMessage.send({
      touser: wxContext.OPENID,
      msgtype: 'text',
      text: {
        content: '欢迎来到辞典大全，我是您的客服小助手，正在快马加鞭去通知客服小哥哥（小姐姐），请稍后！'
      }
    })
    // 返回

    // {
    //   "FromUserName": "ohl4L0Rnhq7vmmbT_DaNQa4ePaz0",
    //   "ToUserName": "wx3d289323f5900f8e",
    //   "Content": "测试",
    //   "CreateTime": 1555684067,
    //   "MsgId": "49d72d67b16d115e7935ac386f2f0fa41535298877_1555684067",
    //   "MsgType": "text"
    // }

    return {
      MsgId: event.MsgId,
      MsgType: event.MsgType,
      ToUserName: event.ToUserName,
      FromUserName: event.FromUserName,
      Content: event.Content,
      CreateTime: parseInt(+new Date / 1000),
    }
  } catch (err) {
    return err
  }
}
