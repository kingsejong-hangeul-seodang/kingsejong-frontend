import local from './LevelCollection.module.css'
import { levels } from './levels'
import type { CSSProperties } from 'react'

export function LevelCollection({ exp }: { exp: number }) {
  const current = levels.findLast((level) => exp >= level.exp) ?? levels[0]
  return (
    <div className={local.collection} data-name="level-collection">
      {levels.map((level) => {
        const unlocked = exp >= level.exp
        return (
          <div
            key={level.name}
            className={local.card}
            data-name="evo-item"
            data-unlocked={unlocked}
            data-current={current === level}
            data-level={level.exp}
            aria-label={`${level.name} · ${unlocked ? '달성' : `${level.exp.toLocaleString('ko-KR')} EXP에 공개`}`}
          >
            <div
              className={local.artwork}
              data-name="evo-art"
              role={unlocked ? undefined : 'img'}
              aria-label={unlocked ? undefined : '아직 공개되지 않은 성장 모습'}
            >
              {unlocked ? (
                <img className={local.art} src={level.image} alt={level.name} />
              ) : (
                <div
                  className={local.mystery}
                  style={
                    {
                      width: level.width,
                      '--character-center-x': `${level.centerX}%`,
                      '--character-center-y': `${level.centerY}%`,
                    } as CSSProperties
                  }
                  aria-hidden="true"
                >
                  <img className={`${local.art} ${local.silhouette}`} src={level.image} alt="" />
                  <span className={local.question}>?</span>
                </div>
              )}
            </div>
            <p className={local.name}>{level.name}</p>
            <p className={local.exp}>{level.exp.toLocaleString('ko-KR')} EXP</p>
          </div>
        )
      })}
    </div>
  )
}
