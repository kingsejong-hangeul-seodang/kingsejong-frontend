# 한글 프론트엔드

React + TypeScript + Vite 기반 한글서당 화면입니다. CSS Modules로 컴포넌트 스타일을
분리하고, 공통 디자인 값은 CSS 변수로 관리합니다.

Figma Screens v2를 바탕으로 화면 이동·선택·필기 UI를 구현했습니다.

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

## 프론트 기능명세

11월 10일 이동건 작성 기획서와 상세 기능명세를 기준으로 정리했습니다. P0는 데모 필수, P1은 MVP에 간단히 포함, P2는 여유가 있을 때 진행합니다. 대상은 한글 손글씨가 아직 익숙하지 않은 외국인 유학생이고, 우선 검수 환경은 Apple Pencil을 사용하는 iPad Safari 세로 화면입니다.

**데모 흐름** · 언어 → 로그인 코드·저장 동의 → 경험·단계 → 모드·취향 → 홈 → 클립 → 원고지 → 결과·다시 쓰기 → 다음 콘텐츠

| 원본 ID                            | 기능과 우선순위             | 프론트 완료 조건                                                                                                                                                                | 현재 구현과 남은 작업                                                                                          |
| ---------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| A-01~05, A-07~08                   | 로그인·온보딩 · P0          | 한·영 UI 전환. 유효한 코드로 토큰·프로필을 받아 진입하고 저장 동의를 반영. 첫 학습자는 초보, 경험자는 단계 선택. K팝은 가수, K드라마는 작품 선택                                | 언어·동의·단계·모드 UI 있음. 코드는 형식 검사만 수행. 전체 번역, 서버 인증, 드라마 작품 선택 필요              |
| A-06                               | 레벨 테스트 · P1            | 가이드 없이 가나다 → 단어 → 문장. 묶음별 80% 기준으로 진행하고 결과에서 추천 단계 적용 또는 직접 선택                                                                           | 세 문항과 결과 화면 있음. 현재는 문항 채점의 정오로 추천. 80% 진행 조건 확인 필요                              |
| B-01~04, B-07~09                   | 홈·콘텐츠 · P0              | 모드별 2~3개, 취향 우선·완료 표시, 단계별 문장·출처 표시. 공식 영상 임베드 구간은 30초 이하이고 끝에서 정지. 재생 시점에 해당 자막 강조                                         | 탭과 카드, 로컬 콘텐츠, 문장·출처 화면 있음. 콘텐츠 수, 실제 재생·자막 동기화, 목록 연동 확인 필요             |
| B-05~06, C-07                      | 뜻·재생 예외·다시 보기 · P1 | 뜻·장면 설명을 보고, 임베드 실패 시 문장만으로 연습 가능. 필기 화면에서도 짧은 클립을 다시 볼 수 있음                                                                           | 뜻·자막 화면과 축소 포스터 있음. 플레이어와 실패 상태를 연결해야 함                                            |
| C-01~06, D-08~09                   | 원고지·제출 · P0            | Pencil 입력의 좌표·시간·필압을 수집. 획은 점이 가장 많이 들어간 칸에 배정하고 칸 밖 획은 무시. 한 획·한 칸·전체 지우기. 제출 한 번에 칸 배열 전송, 진행 중 중복 제출 차단       | Canvas·지우기·제출·동국체 가이드 있음. Pencil만 받는 입력 정책, 획 배정, Safari 실기 검수, 인증 요청 연결 필요 |
| E-01~06, E-09                      | 결과·정답·다음 · P0         | 초보는 틀린 칸, 중수는 틀린 어절, 고수는 맞음·틀림 표시. 정답과 설명, 킹세종 피드백, 획순 재생, 다시 쓰기 및 다음 콘텐츠 이동                                                   | 결과·비교·획순 UI 있음. 계약에 맞는 실제 결과로 단계별 표시와 틀린 범위만 다시 쓰기 검수 필요                  |
| F-01                               | 단계 전환 · P0              | 홈과 쓰기에서 직접 바꾸고, 같은 콘텐츠에 해당 단계의 문제와 가이드를 적용                                                                                                       | 화면 전환과 로컬 설정 있음. 프로필 저장 연동 필요                                                              |
| E-07~08, F-02~03, G-01~05, H-01~03 | 학습 관리·기록 · P1         | 킹세종 한마디, 시간 기반 리플레이, 같은 단계 10회 연속 정답 시 추천. 경험치·레벨은 학습 단계와 별도로 표시. 한국 시간 기준 일일 목표·연속 학습. 자모 숙련도·지난 결과·설정 조회 | 도감·기기 기록·설정·성장 UI를 보유. 서버 기록, 카운트·중복 규칙, 숙련도 연동 필요                              |
| I-01~05                            | 시연 데이터·공개SW · P0     | 초기 콘텐츠·취향·로그인 코드는 최신 API 명세의 1차 JSON 시드를 사용. 엔진과 획 데이터 공개는 별도 산출물                                                                        | 관리자 화면과 CRUD는 1차 프론트 범위에서 제외                                                                  |
| B-10, G-06                         | 추천·달성 배지 · P2         | 취향·약점 자모 추천과 조건 달성 배지                                                                                                                                            | P0 동선 검수 뒤 검토                                                                                           |

| 단계 | 쓰는 분량                                              | 표시와 입력 규칙                                                                                      |
| ---- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| 초보 | 자모 또는 단어 하나                                    | 글자당 한 칸에 연한 동국체 가이드를 표시                                                              |
| 중수 | 단어 또는 어절 2~3개                                   | 어절 단위로 칸을 묶고, 글자 가이드는 생략                                                             |
| 고수 | 띄어쓰기 포함 정답이 들어가는 최소 줄 수, 한 줄에 10칸 | 띄어쓰기 위치를 숨김. 문장 중간의 연속 빈 칸은 엔진이 띄어쓰기 오류로 판단하고 문장 뒤 여유 칸은 무시 |

원고지의 줄바꿈은 화면 배치입니다. 제출 데이터는 0부터 시작하는 1차원 칸 배열이며, 한글 음절·허용 문장부호(`? ! . ,`)는 각 한 칸, 고수의 띄어쓰기는 빈 한 칸입니다. 콘텐츠는 겹받침을 포함한 한글과 허용 문장부호로 구성합니다.

11월 10일 기술 그림에는 Next.js와 브라우저 판정이 있지만, 현재 앱은 React·TypeScript·Vite이며 이후 API 명세에 따라 프론트가 Spring Boot에 제출합니다. D-01~07의 인식, 정렬·띄어쓰기, 글자가 맞은 칸의 획순 판정은 엔진 책임입니다. 프론트는 입력을 모으고 서버 결과를 표시합니다. API 값과 화면 키의 매핑은 [API 명세](#api-명세)를 따릅니다.

P0 검수는 유효·무효 코드 로그인, 실제 클립 또는 문장으로 연습 진입, Pencil 제출 후 결과 표시 순서로 진행합니다. 만료 토큰은 로그인으로 연결하고, 서버 오류가 나면 필기를 보존하고 재제출할 수 있어야 합니다. 제출부터 정상·오류 결과까지 iPad Safari에서 확인하는 것을 데모 완료 기준으로 삼습니다.

## 폴더와 스타일

```text
src/
  main.tsx             # React 진입점
  app/
    routes/            # 화면 주소 → 실제 화면
    layouts/           # 공통 화면 틀·iPad 미리보기
  features/
    onboarding/        # A: 언어·로그인·경험·단계·레벨 테스트·모드·가수
    home/              # B·F·G: 모드 탭·목록·단계 전환·성장
    learning/          # B·C·E: 클립·원고지·결과·비교·획순
      hooks/           # 제출 요청·응답 처리·저장·결과 이동
      reference/       # 동국체 가이드·정답 획·재생
    jamo/              # H: 자모 도감·상세
    records/           # H: 쓰기 기록
    settings/          # H: 설정
    mypage/            # G: 경험치·레벨·수집
  components/
    ui/                # 여러 화면에서 쓰는 버튼·탭·카드
    content/           # 홈과 학습이 같이 쓰는 포스터·클립
    writing/           # 필기 칸·원고지·지우기 도구
  api/                 # Spring Boot 요청과 응답 검증
  data/                # 콘텐츠 시드·필기 타입·기기 저장
  hooks/               # 기능 간 공유 훅
  styles/              # 디자인 토큰·공통 스타일
  devtools/            # 폰트·획 데이터 확인 도구
public/
  assets/       # 화면 이미지·아이콘
  data/         # 생성한 가이드 폰트·정답 획 JSON
scripts/        # 데이터 생성·검사
tests/          # 동작·데이터 검증
```

- `@/`는 `src/`를 가리킵니다. 예: `import { Button } from '@/components/ui/Button'`.
- 화면은 `features/기능명` 바로 아래에 두고 새 화면은 `...Screen.tsx`로 이름을 붙입니다. 해당 기능에서만 쓰는 부품은 기능 폴더에, 여러 기능이 함께 쓰는 부품은 `components/`에 둡니다.
- 주소별 연결과 난이도·모드 지정은 `src/app/routes/screens.tsx`에서 관리합니다.
- 화면별 스타일은 `이름.module.css`에 작성합니다.
- 색상·간격은 `var(--color-primary)`처럼 `tokens.css` 변수를 사용합니다.
- Foundation의 주홍·쪽빛·솔잎 테마를 `data-theme="juhong|jjokbit|solip"`으로 선택합니다.
- 라우터·API 도구·전역 상태·UI 라이브러리는 기능 요구에 맞춰 추가합니다.
- React Compiler는 별도로 활성화하지 않았습니다.

| 화면                  | 현재 파일 (`src/features/` 기준)                                                       | 화면 키                                               |
| --------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| 언어·로그인·한글 경험 | `onboarding/LanguageScreen.tsx`, `LoginScreen.tsx`, `ExperienceScreen.tsx`             | `lang`, `login`, `experience`                         |
| 단계 선택·레벨 테스트 | `onboarding/StageSelectScreen.tsx`, `LevelTestScreen.tsx`, `LevelTestResultScreen.tsx` | `stage-select`, `leveltest-1/2/3`, `leveltest-result` |
| 모드·가수 선택        | `onboarding/ModeSelectScreen.tsx`, `SingerSelectScreen.tsx`                            | `mode-select`, `taste`                                |
| 홈·레벨업             | `home/HomeScreen.tsx`, `LevelUpScreen.tsx`                                             | `home`, `home-drama`, `home-basic`, `levelup`         |
| 클립·원고지           | `learning/ClipScreen.tsx`, `WritingScreen.tsx`                                         | `clip`, `write-{beginner,mid,pro}`                    |
| 결과·정답 비교·획순   | `learning/WritingResultScreen.tsx`, `WritingComparisonScreen.tsx`, `StrokeScreen.tsx`  | `result-*`, `compare-*`, `stroke`                     |
| 도감·자모 상세        | `jamo/JamoCollectionScreen.tsx`, `JamoDetailScreen.tsx`                                | `dogam`, `jamo-digeut`, `jamo-a`                      |
| 기록·설정·마이페이지  | `records/RecordsScreen.tsx`, `settings/SettingsScreen.tsx`, `mypage/MyPageScreen.tsx`  | `records`, `settings`, `mypage`                       |

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

## API 명세

### 프론트 연결 확인

- `npm run dev`에서 API 환경 변수를 비워 두면 로컬 시연 모드로 시작합니다. 로그인 화면에서 `DGU-001`을 입력합니다. Spring Boot와 연결된 환경에서는 이 코드를 서버의 테스트 계정 코드 `DGU-0001`로 전송합니다. 배포 빌드에서 시연 모드가 필요하면 빌드 전에 `VITE_API_MOCK=true`를 설정합니다.
- 실제 Spring Boot는 `VITE_API_BASE_URL`에 서버 주소까지만 지정합니다. 프론트가 `/api/v1`을 붙입니다. 로그인 토큰은 현재 페이지 세션의 메모리에 보관하므로 새로고침하면 재로그인이 필요합니다.
- 홈은 모드·난이도별 `GET /contents` 결과를 카드로 표시합니다. 선택한 숫자 ID와 단계로 `GET /contents/{contentId}`를 받아 클립·원고지에서 공유합니다. 같은 ID로 제출하고, 결과의 다음 글은 상세 응답의 `nextContentId`를 따릅니다. 마지막 글이면 홈으로 돌아갑니다.
- 더미 모드의 목록과 상세도 같은 형식을 사용합니다. 영상 ID와 임베드가 가능한 실제 콘텐츠는 클립 구간을 재생하며 자막을 강조합니다. 영상을 사용할 수 없으면 문장으로 연습합니다.
- 홈·마이페이지는 `GET /me`의 학습 현황과 레벨을 사용합니다. 자모 도감은 `/jamo`, `/jamo/{jamo}` 및 `/reference/strokes`를 조회하고, 연습은 상세의 `practiceContentId`로 시작합니다. 쓰기 기록은 `/writings`의 커서와 `/writings/{writingId}`의 필기 원본을 사용합니다.
- 취향 화면은 `GET /tastes`로 가수·작품을 표시하고, `PUT /me/tastes`로 저장합니다. 시연 모드에서는 샘플 이름·자모와 브라우저에 저장한 필기 기록으로 화면을 확인할 수 있습니다.
- 온보딩 완료 시 선택한 한글 경험·난이도·모드를 `PATCH /me`로 저장합니다. 이후 로그인은 서버의 온보딩 완료 상태를 확인해 홈을 엽니다.
- 제출 응답의 `grade`는 엔진 응답 스키마로 검증합니다. `201`의 `reward`로 경험치·레벨업을 표시하고 `nextContentId`로 다음 글을 엽니다. 정답 비교는 서버 획을 조회합니다. `VITE_GRADING_ENDPOINT`는 이전 채점 계약을 확인할 때만 사용합니다.

### 동국체 로컬 미리보기

- 공개 빌드는 기본 글꼴로 따라쓰기 가이드와 자모 모양을 표시합니다. 동국체 변환 파일의 배포 범위를 확인할 때까지 웹폰트와 생성된 획 데이터는 `repos.local/guide-font/`에 보관합니다.
- 팀에서 받은 원본 폰트와 `scripts/reference-requirements.txt`의 Python 의존성을 준비한 뒤 `npm run data:guide -- --font <TTF 경로>`를 실행하면 로컬 개발 서버에서 동국체로 볼 수 있습니다. 폰트 사용 범위는 [동국체 공식 매뉴얼](https://www.dongguk.edu/resources/pdf/donggukfont/DONGGUK_font_manual.pdf)을 확인하세요.
- `npm run data:generate -- --font <TTF 경로> --preview-strokes`는 연습 콘텐츠, 레벨 테스트, 자모 도감에서 사용하는 글자의 동국체 획을 추출합니다. 정답 비교, 획순 상세, 자모 도감, 미리보기가 같은 파일을 사용합니다. 획 추출에 실패한 글자는 글꼴이 제공하는 동국체 글자 모양을 표시합니다.
- 수가공된 동국체 `composed_all.json`을 받았다면 `npm run data:generate -- --composed "<JSON 경로>"`로 적용합니다. 기본 경로에 원본 TTF가 없으면 `--font "<TTF 경로>"`를 추가합니다. 로컬 미리보기는 현재 연습·레벨 테스트·자모에 필요한 획을 원본 JSON에서 가져와 우선 사용합니다.
- 레벨 테스트는 `GET /level-test`와 `POST /level-test/steps/{step}`를 사용합니다. 단계 통과와 추천은 서버 응답을 따르며, 추천 적용에 동의하면 `PATCH /me`로 저장합니다.

이동건 · 원문 날짜 표기 `26.111.19`

프론트는 Spring Boot의 `/api/v1`을 호출하고, 교정 엔진은 백엔드에서 호출합니다. 상세 경로와 요청·응답은 [스프링부트 API 명세](https://app.notion.com/p/41e148df0f7881148c80faa9be5da975?pvs=21)를 따릅니다.

- JSON은 UTF-8과 camelCase를 사용합니다. 성공 본문은 데이터 그대로 반환하며 조회·수정은 200, 생성은 201, 본문 없는 성공은 204입니다.
- 로그인 이후에는 `Authorization: Bearer <accessToken>`을 보냅니다. JWT, 30일 만료, 갱신 없음은 가정입니다. 로그아웃은 프론트에서 토큰을 삭제합니다.
- 시간은 한국 시간 ISO 8601(예: `2026-11-18T21:30:00+09:00`)이며 날짜 경계는 한국 시간 자정입니다. 칸과 획은 0부터 셉니다. 설명 언어는 프로필의 `locale`을 따릅니다.
- 1차 관리자 기능을 JSON 시드로 대신하는 것은 가정입니다.

| 필드       | API 값과 화면 의미                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------- |
| stage      | beginner(초보), intermediate(중수), advanced(고수). 화면 경로에서는 중수와 고수를 mid, pro로 표기 |
| mode       | kpop(K팝), kdrama(K드라마), basic(기본 연습)                                                      |
| writeMode  | trace(따라 쓰기), copy(보고 쓰기), dictation(듣고 받아쓰기)                                       |
| locale     | ko(한국어), en(English)                                                                           |
| experience | first(처음 배워요), studied(공부해 봤어요)                                                        |
| mastery    | familiar(익숙), practice(연습), none(아직 안 씀)                                                  |
| mark       | none(표시 없음), char(글자·빨강), spacing(띄어쓰기·빨강), stroke(획순·주황)                       |
| expression | default(기본), praise(칭찬), regret(아쉬움), encourage(격려)                                      |

오류 응답 예시:

```json
{
  "code": "INVALID_REQUEST",
  "message": "요청 값이 규칙에 맞지 않아요",
  "details": [{ "field": "cells[0].strokes", "message": "획이 너무 많아요 (최대 60개)" }]
}
```

| HTTP | code               | 의미와 처리                            |
| ---- | ------------------ | -------------------------------------- |
| 400  | INVALID_JSON       | 본문이 JSON이 아님                     |
| 401  | UNAUTHORIZED       | 토큰 누락·만료 시 로그인 화면으로 이동 |
| 401  | INVALID_LOGIN_CODE | 잘못된 로그인 코드                     |
| 403  | FORBIDDEN          | 다른 사람의 기록 접근                  |
| 404  | NOT_FOUND          | 주소·콘텐츠·기록을 찾을 수 없음        |
| 422  | INVALID_REQUEST    | details에 필드 위치와 이유 제공        |
| 502  | ENGINE_ERROR       | 엔진 오류 응답                         |
| 503  | ENGINE_UNAVAILABLE | 엔진 연결 실패                         |
| 504  | ENGINE_TIMEOUT     | 엔진 응답 시간 초과                    |
| 500  | INTERNAL_ERROR     | 서버 내부 오류                         |

제출 중 5xx가 발생하면 “잠시 뒤 다시 제출해 주세요”를 표시하고 필기를 보존합니다.

백엔드에서 사용할 엔진 경로는 `POST /grade`, `GET /health`, 신규로 필요한 `GET /reference`입니다. 엔진 담당자의 경로 확인이 필요합니다. [교정 엔진 API 명세](https://app.notion.com/p/41e148df0f788160b1b2f4ccc3f209b3?pvs=21)

## 자동 검사

GitHub 저장소에 올리면 `.github/workflows/ci.yml`이 push와 PR에서
`npm ci`, `npm test`, `npm run check`를 실행합니다.

## 참고

- 생성 데이터·요청/응답 검증: `npm test`.

- [Vite 가이드](https://ko.vite.dev/guide/)
- [ESLint](https://eslint.org/docs/latest/)
- [Prettier](https://prettier.io/docs/)
