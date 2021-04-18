const num = 5 // 5个
console.log('count: ' + hannuota(num)) // 输出

function hannuota (num) {
  // 生成3个柱子
  const arr1 = [] // const arr1 = [1, 2, 3, 4, 5, 6, 7]
  for (let i = 1; i <= num; i++) {
    arr1.push(i)
  }
  const arr2 = []
  const arr3 = []
  const container = [arr1, arr2, arr3] // 底座
  let lastReceive = null // 接受过人的数组 which accepted last time
  let count = 0 // 次数

  // 第一次
  const one = arr1.shift(arr1[0])
  if (num % 2 === 1) { // 奇3偶2
    arr3.unshift(one)
    lastReceive = arr3
  } else {
    arr2.unshift(one)
    lastReceive = arr2
  }
  count++

  // 第2到 n次
  while (arr3.length !== num) {
    let canReceive
    let canOut
    // 获取其他成员
    const exporters = otherMember(lastReceive, container)

    // 获取适合输出
    canOut = exporters.reduce((exporter1, exporter2) => {
      // 排除空的之后，小的输出
      if (exporter1.length !== 0) {
        if (exporter2.length !== 0) {
          return exporter1[0] > exporter2[0] ? exporter2 : exporter1
        }

        return exporter1
      } else {
        return exporter2
      }
    })

    // 获取其他成员
    const recipients = otherMember(canOut, container)

    // 比较适合接收
    canReceive = recipients.reduce((recipient1, recipient2) => {
      stateP1 = isPartner(recipient1, canOut) // boolean
      stateP2 = isPartner(recipient2, canOut) // boolean
      /*               can in?
       *  p1.length  p1      p2
       *  0          true  false   1
       *  0          true   true   2
       *  1          true   true   1
       *  1          false  true   2
       *  1          false  false  n
       *  1          true   false  1
       */
      // 都为true的时候选第二个， 其他时候谁行谁放
      if (stateP1 && stateP2 && recipient1.length === 0) { // 同时都可以接收的情况
        return recipient2
      }

      // 优先放recipient1   stateP1 && stateP2 && recipient1.length !== 0
      if (stateP1) return recipient1
      if (stateP2) return recipient2

    })
    // 移动
    const one = canOut.shift()
    canReceive.unshift(one)
    lastReceive = canReceive
    ++count
  }

  return count
}

function otherMember (me, team) {
  // 取反
  return team.filter(member => member !== me)
}

function isPartner ([receive], [out]) {
  if (receive === undefined) return true // 空的能进
  return receive > out && out % 2 !== receive % 2 // 下>上 && 奇偶错开
}
