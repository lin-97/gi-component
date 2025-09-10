import { useBemClass } from '../../../../hooks';

export function getPrefixCls(name: string) {
  const { b } = useBemClass();
  return b(name);
}
