// 云开发 云函数入口

// 云函数 登录函数
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const userCollection = db.collection('user')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  try {
    console.log(event,'event')
    const allUser = (await userCollection.get()).data
    const [userInfo] = allUser.filter(v => v.openId === OPENID)
    console.log('查到的userInfo', userInfo)
    let nickName, avatarUrl, gender, province, city
    // 无记录，加记录
    if (!userInfo) {
      await userCollection.add({
        data: {
          openId: OPENID,
          nickName: event.nickName,
          avatarUrl: event.avatarUrl,
          province: event.province,
          city: event.city,
          gender: event.gender,
          createdTime: db.serverDate(),
        },
      })
      // 有记录，返回用户信息
    } else {
      nickName = event.nickName
      avatarUrl = event.avatarUrl
      province = event.province
      city = event.city
      gender = event.gender
    }
    return {
      nickName: nickName || null,
      avatarUrl: avatarUrl || null,
      gender: gender || null,
      province: province || null,
      city: city || null,
      openId: OPENID
    }
  } catch (e) {
    console.error(e)
    return {
      code: 500,
      message: '服务器错误',
    }
  }
}
