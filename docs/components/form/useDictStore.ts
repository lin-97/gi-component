import { reactive } from 'vue';

export function useDictStore(dictCodes: string[]) {
  const dict: any = reactive({});

  dict['SEX'] = [
    { label: '男', value: '1' },
    { label: '女', value: '2' }
  ];

  dict['STATUS'] = [
    { label: '启用', value: '1' },
    { label: '禁用', value: '2' }
  ];

  dict['HOBBY'] = [
    { label: '吃饭', value: '吃饭' },
    { label: '睡觉', value: '睡觉' },
    { label: '打豆豆', value: '打豆豆' }
  ];

  return {
    dict
  };
}
