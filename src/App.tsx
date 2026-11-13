import styles from './App.module.css'

export default function App() {
  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="welcome-title">
        <span className={styles.badge}>HANGEUL</span>
        <h1 id="welcome-title">한글, 여기서 시작해요.</h1>
        <p className={styles.description}>
          React와 TypeScript로 만드는 새로운 화면. 기본 환경이 준비됐어요.
        </p>
        <dl className={styles.details}>
          <div>
            <dt>화면</dt>
            <dd>React + TypeScript</dd>
          </div>
          <div>
            <dt>스타일</dt>
            <dd>CSS Modules + 디자인 토큰</dd>
          </div>
          <div>
            <dt>개발 도구</dt>
            <dd>Vite · ESLint · Prettier</dd>
          </div>
        </dl>
        <p className={styles.note}>Foundation의 공통 색상과 여백이 적용됐어요.</p>
      </section>
    </main>
  )
}
