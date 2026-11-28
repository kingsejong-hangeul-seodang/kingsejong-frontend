import { useUiText } from '@/app/useUiText'
import local from './LevelCollection.module.css'
import { levels } from '@/data/levels'

export function LevelCollection({
  exp,
  collection,
  currentNo,
}: {
  exp: number
  collection: { no: number; name: string; minExp: number }[]
  currentNo: number | undefined
}) {
  const t = useUiText()
  return (
    <div className={local.collection} aria-label={t('킹세종 성장 단계')}>
      {collection.map((level) => {
        const unlocked = exp >= level.minExp
        const image = levels[level.no - 1]?.image
        return (
          <div
            key={level.no}
            className={local.card}
            data-current={currentNo === level.no}
            aria-label={`${level.name} · ${unlocked ? t('달성') : t('{0} EXP에 공개', level.minExp.toLocaleString('ko-KR'))}`}
          >
            <div className={local.artwork}>
              {image ? (
                <img
                  className={`${local.art} ${unlocked ? '' : local.silhouette}`}
                  src={image}
                  loading="lazy"
                  alt=""
                />
              ) : null}
            </div>
            <p className={local.name}>{level.name}</p>
            <p className={local.exp}>{level.minExp.toLocaleString('ko-KR')} EXP</p>
          </div>
        )
      })}
    </div>
  )
}
