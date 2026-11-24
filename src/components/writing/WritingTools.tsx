import { useUiText } from '@/app/useUiText'
import styles from '@/components/ui/controls.module.css'
import { useState } from 'react'
import { useWriting } from './useWriting'
import { Button } from '@/components/ui/Button'
import layout from '@/components/writing/WritingTools.module.css'
export function WritingTools() {
  const t = useUiText()
  const [confirmClear, setConfirmClear] = useState(false)
  const writing = useWriting()
  const tools = [
    { label: t('한 획 지우기'), icon: 'f0146.svg', onClick: () => writing.command('undo') },
    { label: t('칸 지우기'), icon: 'eb7c4.svg', onClick: () => writing.command('cell') },
    { label: t('전체 지우기'), icon: '1dc70.svg', onClick: () => setConfirmClear(true) },
  ]
  return (
    <div className={layout.writingTools}>
      <div
        className={styles.tools}
        data-name="tools"
        role="group"
        aria-label={t('글씨 지우기 도구')}
      >
        {tools.map(({ label, icon, onClick }) => (
          <Button
            key={label}
            variant="tool"
            aria-label={label}
            data-action="tool"
            data-name="tool"
            className={styles.tool}
            onClick={onClick}
          >
            <img src={`/assets/figma/${icon}`} alt="" />
            <span>{label}</span>
          </Button>
        ))}
      </div>
      {confirmClear && (
        <div className={layout.clearConfirmation} role="group" aria-label={t('전체 지우기 확인')}>
          <p>{t('쓴 글씨를 모두 지울까요?')}</p>
          <Button variant="text" onClick={() => setConfirmClear(false)}>
            {t('취소')}
          </Button>
          <Button
            variant="small"
            onClick={() => {
              writing.command('clear')
              setConfirmClear(false)
            }}
          >
            {t('모두 지우기')}
          </Button>
        </div>
      )}
    </div>
  )
}
