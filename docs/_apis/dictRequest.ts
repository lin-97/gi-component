// 模拟字典数据请求
export const getDictData = async (
  code: string
): Promise<{ label: string; value: string }[]> => {
  const dictData: Record<string, { label: string; value: string }[]> = {
    SEX: [
      { label: '男', value: '1' },
      { label: '女', value: '2' }
    ],
    STATUS: [
      { label: '正常', value: '1' },
      { label: '禁用', value: '2' }
    ],
    CITY: [
      { label: '北京', value: '1' },
      { label: '上海', value: '2' },
      { label: '广州', value: '3' },
      { label: '深圳', value: '4' },
      { label: '成都', value: '5' }
    ]
  };
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('获取的字典请求', code, dictData[code]);
      resolve(dictData[code]);
    }, 500);
  });
};
