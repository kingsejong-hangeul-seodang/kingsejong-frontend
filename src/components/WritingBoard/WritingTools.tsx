import { Action } from '@/components/ui/Action'
import styles from '@/components/ui/controls.module.css'
export function WritingTools() {
  return (
    <div className={styles.tools} data-name="tools" role="group" aria-label="글씨 지우기 도구">
      {[
        ['한 획 지우기', 'f0146.svg'],
        ['칸 지우기', 'eb7c4.svg'],
        ['전체 지우기', '1dc70.svg'],
      ].map(([label, icon]) => (
        <Action key={label} kind="tool" label={label!} data-name="tool" className={styles.tool}>
          <img src={`/assets/figma/${icon}`} alt="" />
          <span>{label}</span>
        </Action>
      ))}
    </div>
  )
}
