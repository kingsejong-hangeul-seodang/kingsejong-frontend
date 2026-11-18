# 공통 컴포넌트

기준: [Figma Components](https://www.figma.com/design/T4iKsOzvLK6QEnVRCeakTS?node-id=3-3).
React + TypeScript + CSS Modules를 유지하며, 기존 Foundation 토큰과 원본 이미지·SVG를
사용합니다. 화면은 레이아웃과 콘텐츠를 제공하고, 공통 UI의 모양은 아래 컴포넌트가
담당합니다.

| Figma                               | 구현                                      | 사용 위치                               |
| ----------------------------------- | ----------------------------------------- | --------------------------------------- |
| 버튼/주·보조·작은·비활성, 글자 링크 | `ui/Button`, `ui/SubmitButton`            | 전체 화면의 `Action`이 공통 버튼 렌더링 |
| 쓰기 도구                           | `WritingBoard/WritingTools`               | 쓰기·레벨 테스트                        |
| 배지·경험치 칩                      | `ui/Badge`                                | 홈·기록·테스트·자모 상세                |
| 난이도 전환                         | `ui/SegmentedControl`, `ui/StageSelector` | 홈·학습·설정                            |
| 모드 탭                             | `ui/ModeTabs`                             | 홈 4종                                  |
| 원고지 칸·어절 묶음                 | `WritingBoard/ManuscriptPaper`            | 쓰기·결과·비교·레벨 테스트              |
| 킹세종 말풍선                       | `SejongGuide/SejongMessage`               | 온보딩·홈·학습                          |
| 캐릭터                              | `SejongGuide/SejongGuide`                 | 캐릭터 단독 표시                        |
| 기본 썸네일                         | `ui/Thumbnail`                            | 홈·클립·모드·가수 선택                  |
| 콘텐츠 카드                         | `ui/ContentCard`                          | K팝·K드라마 홈                          |
| 선택 카드                           | `ui/ChoiceCard`                           | 언어·경험·난이도·모드·가수 선택         |
| 홈 통계                             | `ui/StatCard`, `ui/ProgressBar`           | 홈·마이·정답 재생                       |
| 자모 칸                             | `ui/JamoTile`                             | 자모 도감                               |
| 획순 상자                           | `ui/StrokeDiagram`                        | 획순·자모 상세                          |
| 목록 행                             | `ui/ListRow`                              | 기록·설정·기본 연습·마이                |
| 입력칸                              | `ui/TextInput`                            | 로그인 코드                             |
| 앱바·탭바                           | `ui/AppBar`, `ui/MainNavigation`          | 공통 상단·하단 이동                     |
| 콘텐츠 영역                         | `ui/Panel`                                | 카드형 본문 영역                        |

`Action`은 화면 이동과 선택 상태를 담당하는 연결 계층입니다. 버튼의 색상·크기·글자
규격은 `Button`에서 관리합니다. ‘다시 쓰기’는 주 버튼으로 통일하여 흰색 글씨를
사용합니다. 판정 데이터가 없는 상황에서 임의의 맞음·틀림 판정을 만들지는 않습니다.

## 원고지 사용

각 화면은 다음 어댑터를 가져와 사용합니다.

```tsx
// 초보: 실제 필기 캔버스와 회색 가이드
<PracticePaper
  count={2}
  columns={2}
  cellSize={144}
  guides={['/assets/figma/530cd.svg', '/assets/figma/2667d.svg']}
/>

// 중수: 한 어절 안의 테두리는 이어지고, 어절 사이만 분리
<PracticePaper count={5} columns={5} cellSize={96} groups={[2, 3]} />

// 제출한 필기와 정답도 동일한 격자 구현을 사용
<SubmittedWriting stage="mid" />
<AnswerPaper stage="mid" />
```

공통 `ManuscriptPaper`는 `count`, `columns`, `cellSize`, `groups`, `renderCell`을 받습니다.
칸 크기는 Figma의 72·96·144px을 사용하고, 좁은 영역에서는 정사각형 비율을 유지하며
축소합니다. 한 줄에서 테두리는 1px로 이어지고, 마지막 줄의 남는 위치도 빈 원고지
칸으로 채웁니다. `groups`는 칸 합계가 `count`와 일치할 때 어절 간격을 적용합니다.
`cellStates`의 `error`·`stroke-order`는 실제 판정이 있을 때만 사용할 수 있습니다.

검은 예시 글씨는 추가하지 않습니다. `WritingCell`은 사용자 입력만 수집하고,
제출 후에는 `SubmittedWriting`이 캔버스 이미지를 같은 칸 순서로 표시합니다.
정답 비교는 `ComparisonPaper`가 같은 너비를 지정하여 내 글씨와 정답의 칸 크기가
달라지지 않게 합니다.
