# 한글 프론트엔드

React + TypeScript + Vite 기반 초기 환경입니다. CSS Modules로 컴포넌트 스타일을
분리하고, 공통 디자인 값은 CSS 변수로 관리합니다.

ESLint의 flat config에서 JavaScript·TypeScript 권장 규칙, React Hooks와
Fast Refresh 규칙을 적용합니다. 포맷은 Prettier가 담당하며,
`eslint-config-prettier`로 충돌하는 스타일 규칙을 끕니다.
TypeScript는 `typescript-eslint`의 지원 범위에 맞춘 6 계열을 사용합니다.

## 실행

Node.js **24.16.0**, npm **11.13.0** 기준입니다. `.nvmrc`를 사용하는 환경에서는
`nvm use`로 전환할 수 있습니다. nvm-windows에서는 `nvm install 24.16.0`,
`nvm use 24.16.0`을 실행하세요. npm 버전은 `npm --version`으로 확인합니다.

```bash
npm ci
npm run dev
```

터미널에 표시된 로컬 주소를 엽니다.

## 명령어

| 명령어                 | 용도                                    |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | 개발 서버                               |
| `npm run typecheck`    | TypeScript 타입 검사                    |
| `npm run lint`         | ESLint 검사, 경고도 실패 처리           |
| `npm run lint:fix`     | 자동 수정 가능한 린트 문제 수정         |
| `npm run format`       | Prettier 포맷 적용                      |
| `npm run format:check` | 포맷 검사                               |
| `npm run build`        | 타입 검사 후 배포 파일을 `dist/`에 생성 |
| `npm run check`        | 포맷·린트·타입·빌드 전체 검사           |
| `npm run preview`      | 빌드 결과 로컬 확인                     |

## 폴더와 스타일

```text
docs/
  design-system.md  # 디자인 토큰·테마·글자 스타일 사용 안내
src/
  assets/
    images/
    icons/
    fonts/
  styles/
    tokens.css      # Figma Foundation 공통 색상·간격·폰트
    tokens.json     # Figma에서 가져온 토큰 원본 데이터
    typography.css  # 글자 규격별 공통 클래스
    global.css      # 기본 스타일
  App.tsx           # 시작 화면
  App.module.css    # 시작 화면 전용 CSS
  main.tsx          # 앱 진입점
```

- `@/`는 `src/`를 가리킵니다. 예: `import styles from '@/App.module.css'`.
- 화면별 스타일은 `이름.module.css`에 작성합니다.
- 색상·간격은 `var(--color-primary)`처럼 `tokens.css` 변수를 사용합니다.
- Foundation의 주홍·쪽빛·솔잎 테마를 `data-theme="juhong|jjokbit|solip"`으로 선택합니다.
- 자세한 토큰 이름과 폰트 적용 상태는 [디자인 시스템 문서](docs/design-system.md)를 참고하세요.
- 라우터·API 도구·전역 상태·UI 라이브러리는 기능 요구에 맞춰 추가합니다.
- React Compiler는 별도로 활성화하지 않았습니다.

## 의존성과 버전 관리

- 패키지 매니저는 npm을 사용합니다. 다른 잠금 파일을 섞지 않습니다.
- `package.json`에는 직접 의존성 버전을 정확히 기록하며 `.npmrc`의
  `save-exact=true`가 새 설치에도 적용됩니다.
- `package-lock.json`은 간접 의존성을 포함한 설치 결과입니다. 반드시 함께 커밋합니다.
- 새 체크아웃과 CI에서는 `npm ci`로 잠금 파일에 따라 설치합니다.
- 앱 코드에 쓰는 패키지는 `npm install 패키지명`, 개발 도구는
  `npm install -D 패키지명`으로 추가합니다.
- 업데이트 전 지원 Node.js 버전, peerDependencies, 변경 기록을 확인합니다.
  변경 후 `npm run check`와 주요 화면을 확인하고 두 package 파일을 함께 커밋합니다.
- 프로젝트가 하나이므로 모노리포와 카탈로그는 도입하지 않았습니다.

## 환경 변수

필요할 때 `.env.local`에 작성합니다. `VITE_`로 시작하는 변수는 브라우저에
공개되므로 비밀번호나 서버 비밀 키를 넣지 마세요. `.env*`는 Git에서 제외하며,
공유할 변수 이름과 예시 값은 `.env.example`에 기록합니다.

## 자동 검사

GitHub 저장소에 올리면 `.github/workflows/ci.yml`이 push와 PR에서
`npm ci`와 `npm run check`를 실행합니다. 현재 폴더는 Git 저장소로 초기화하지 않았습니다.

## 참고

- [Vite 가이드](https://ko.vite.dev/guide/)
- [ESLint](https://eslint.org/docs/latest/)
- [Prettier](https://prettier.io/docs/)
