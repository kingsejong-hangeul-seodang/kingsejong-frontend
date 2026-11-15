import { SegmentedControl } from './SegmentedControl'
export function StageSelector() {
  return <SegmentedControl options={['초보', '중수', '고수']} label="난이도 선택" />
}
