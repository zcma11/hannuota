const a = 7 // 5个
// const arr1 = [1, 2, 3, 4, 5, 6, 7]
const arr1 = []
for (let i = 0; i < a; i++) {
  arr1[i] = n++
}
const arr2 = []
const arr3 = []
const container = [arr1, arr2, arr3]
let i = -1 // 接受过人的数组下标 which accepted last time
let canReceive = null
let canOut = null
let temporary1 = null
let temporary2 = null
let count = 0 // 次数
while (arr3.length !== a) {
  if (i < 0) {
    const one = arr1.shift(arr1[0])
    if (a % 2 === 1) {
      arr3.unshift(one)
      i = arr3
    } else {
      arr2.unshift(one)
      i = arr2
    }
  } else {
    canOut = filter(i).find((arr, index) => {
      canReceive = filter(arr).find(item => {
        if (item.length === 0) {
          temporary1 = item
          return
        }

        return item[0] > arr[0] && arr[0] % 2 !== item[0] % 2
      })

      !canReceive && temporary1 && (canReceive = temporary1)
      index === 0 && (temporary2 = arr)
      if (!canReceive) return false
      if (canReceive.length === 0) return true
      return canReceive[0] > arr[0] && arr[0] % 2 !== canReceive[0] % 2
    })

    !canOut && temporary2 && (canOut = temporary2)
    const one = canOut.shift(canOut[0])
    canReceive.unshift(one)
    i = canReceive
    canReceive = null
    canOut = null
    temporary1 = null
    temporary2 = null
  }
  ++count
}

function filter(val) {
  // 过滤掉不合条件的数组
  return container.filter(arr => arr !== val)
}
