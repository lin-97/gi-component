import type { PageResult } from '../hooks/useTable'

export interface UserItem {
  id: string
  name: string
  age: number
  sex: string
  address: string
  city: string
  district: string
  remark: string
}

const generateMockData = (): UserItem[] => {
  const names = [
    '张',
    '李',
    '王',
    '赵',
    '钱',
    '孙',
    '周',
    '吴',
    '郑',
    '冯',
    '陈',
    '廖',
    '杨'
  ]
  const cities = [
    { name: '北京', districts: ['东城区', '西城区', '朝阳区'] },
    { name: '上海', districts: ['浦东新区', '黄浦区', '静安区'] },
    { name: '广州', districts: ['天河区', '越秀区', '海珠区'] },
    { name: '深圳', districts: ['南山区', '福田区', '罗湖区'] },
    { name: '杭州', districts: ['西湖区', '余杭区', '滨江区'] },
    { name: '成都', districts: ['锦江区', '武侯区', '高新区'] },
    { name: '武汉', districts: ['武昌区', '江汉区', '洪山区'] },
    { name: '厦门', districts: ['思明区', '湖里区', '集美区'] },
    { name: '南京', districts: ['玄武区', '秦淮区', '建邺区'] },
    { name: '天津', districts: ['和平区', '河西区', '南开区'] },
    { name: '重庆', districts: ['渝中区', '江北区', '南岸区'] },
    { name: '沈阳', districts: ['和平区', '沈河区', '皇姑区'] },
    { name: '济南', districts: ['历下区', '市中区', '槐荫区'] },
    { name: '青岛', districts: ['城阳区', '市南区', '崂山区'] },
    { name: '昆明', districts: ['五华区', '盘龙区', '西山区'] }
  ]

  const data: UserItem[] = []

  for (let i = 0; i < 100; i++) {
    const name = `${names[Math.floor(Math.random() * names.length)]}${i + 1}`
    const age = 18 + Math.floor(Math.random() * 60)
    const sex = Math.random() > 0.5 ? '男' : '女'
    const cityInfo = cities[Math.floor(Math.random() * cities.length)]
    const district
      = cityInfo.districts[Math.floor(Math.random() * cityInfo.districts.length)]

    data.push({
      id: i.toString(),
      name,
      age,
      sex,
      address: cityInfo.name,
      city: cityInfo.name,
      district,
      remark: `这是${name}的备注信息，他的年龄是${age}岁，性别是${sex}`
    })
  }

  return data
}

export const getUserList = (params: {
  page: number
  size: number
  keyword?: string
  sex?: string
}): Promise<PageResult<UserItem>> => {
  const { page, size, keyword, sex } = params

  return new Promise((resolve) => {
    setTimeout(() => {
      let allData = generateMockData()

      if (keyword) {
        const lowerKeyword = keyword.toLowerCase()
        allData = allData.filter(
          item =>
            item.name.toLowerCase().includes(lowerKeyword)
            || item.address.toLowerCase().includes(lowerKeyword)
            || item.city.toLowerCase().includes(lowerKeyword)
        )
      }

      if (sex) {
        allData = allData.filter(item => item.sex === sex)
      }

      const total = allData.length
      const startIndex = (page - 1) * size
      const endIndex = startIndex + size
      const paginatedData = allData.slice(startIndex, endIndex)

      resolve({
        list: paginatedData,
        total
      })
    }, 300)
  })
}
