import type { ComponentProps } from 'react'
import { Action } from './Action'
export function SubmitButton({ className }: Pick<ComponentProps<typeof Action>, 'className'>) {
  return (
    <Action className={className} kind="버튼/주" label="다 썼어요">
      다 썼어요
    </Action>
  )
}
