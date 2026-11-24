import { useUiText } from '@/app/useUiText'
import { replaceScreen } from '@/app/router'
import { useSession } from '@/app/useSession'
import { Button } from '@/components/ui/Button'
import styles from '../Settings.module.css'

export function LogoutButton({ nodeId }: { nodeId?: string }) {
  const t = useUiText()
  const { reset } = useSession()

  function handleLogout() {
    reset()
    replaceScreen('lang')
  }

  return (
    <Button
      className={styles.logoutButton}
      data-node-id={nodeId}
      data-name="버튼/보조"
      data-action="버튼/보조"
      variant="secondary"
      onClick={handleLogout}
    >
      {t('로그아웃')}
    </Button>
  )
}
