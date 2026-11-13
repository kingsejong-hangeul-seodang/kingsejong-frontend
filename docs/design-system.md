# 디자인 시스템

[Figma 원본 페이지](https://www.figma.com/design/T4iKsOzvLK6QEnVRCeakTS?node-id=3-2)
에서 2026-11-12에 읽어온 디자인 값입니다. **Figma 원본은 수정하지 않았습니다.**

## 파일

- [`src/styles/tokens.json`](../src/styles/tokens.json): 색상 29개 × 테마 3종, 간격 6개, 모서리 4개, 글자 규격 9개와 출처
- [`src/styles/tokens.css`](../src/styles/tokens.css): 앱에서 사용하는 CSS 변수
- [`src/styles/typography.css`](../src/styles/typography.css): 글자 규격을 적용하는 공통 클래스

토큰 데이터와 스타일은 `src/styles/`, 이미지·아이콘·폰트 파일은 `src/assets/`에서 관리합니다.

## 색상과 테마

| 테마        | data-theme | 브랜드 색 |
| ----------- | ---------- | --------- |
| 주홍 (기본) | `juhong`   | `#B8472A` |
| 쪽빛        | `jjokbit`  | `#2F5D8C` |
| 솔잎        | `solip`    | `#3E7B57` |

페이지 전체를 전환하려면 다음을 실행합니다.

```ts
document.documentElement.dataset.theme = 'jjokbit'
```

영역별로는 `<section data-theme="solip">...</section>`처럼 사용합니다.
테마는 브랜드뿐 아니라 Figma에서 값이 다른 success·info 계열도 함께 변경합니다.

Figma 변수 이름의 `/`는 `-`로 바꿉니다. 예: `text/1` → `--color-text-1`.

```css
.card {
  background: var(--color-surface);
  color: var(--color-text-1);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-m);
  padding: var(--space-block-pad);
}

.button {
  background: var(--color-brand);
  color: var(--color-on-brand);
}

.button:active {
  background: var(--color-brand-pressed);
}
```

색상 범주: `bg`, `surface`, `paper`, `line`, `line-strong`, `text-1/2/3/disabled`,
`brand`, `on-brand`, `brand-tint`, `brand-pressed`, `danger`, `success`, `warning`,
`info`와 각 tint, `thumb-1/2/3/4`, `wongoji-line`.
정확한 전체 목록과 테마별 값은 `src/styles/tokens.json`을 확인하세요.

기존 화면이 계속 동작하도록 `--color-primary`, `--color-background`, `--color-border`,
`--color-text`, `--color-text-muted`도 의미가 같은 Foundation 변수의 별칭으로 유지합니다.

## 간격과 모서리

| CSS 변수            | 값    |
| ------------------- | ----- |
| `--space-stack-s`   | 8px   |
| `--space-block-gap` | 12px  |
| `--space-stack-m`   | 16px  |
| `--space-block-pad` | 24px  |
| `--space-stack-l`   | 32px  |
| `--space-page-x`    | 40px  |
| `--radius-s`        | 8px   |
| `--radius-m`        | 12px  |
| `--radius-l`        | 16px  |
| `--radius-pill`     | 999px |

초기 세팅의 숫자 간격 이름은 호환용 별칭입니다.
`--space-1: 4px`은 Foundation 외 프로젝트 보조 값으로 유지합니다.

## 글자

페이지의 규격 표기 및 사용자 제공 스크린샷을 기준으로 작성했습니다.
Figma 예시 문장 노드는 실제로 모두 12px로 렌더링되어 있어 규격 표기와 다릅니다.
추가 스타일 상세 조회는 승인되지 않아 로컬 텍스트 스타일 속성 전체는 가져오지 않았습니다.

| 클래스                 | 크기 / 행간 | 굵기 |
| ---------------------- | ----------- | ---- |
| `type-title`           | 28 / 38px   | 700  |
| `type-h2`              | 20 / 28px   | 700  |
| `type-strong`          | 16 / 24px   | 500  |
| `type-body`            | 16 / 25px   | 400  |
| `type-sub-bold`        | 14 / 21px   | 700  |
| `type-sub-strong`      | 14 / 21px   | 500  |
| `type-sub`             | 14 / 21px   | 400  |
| `type-caption`         | 12 / 18px   | 500  |
| `type-caption-regular` | 12 / 18px   | 400  |

CSS에는 접근성 설정을 따를 수 있게 rem으로 변환했으며 위 px 수치는 루트 16px 기준입니다.

```tsx
<h1 className="type-title">한글 연습</h1>
<p className="type-body">좋아하는 가사를 원고지에 따라 써요.</p>
```

CSS Modules에서는 `font-size: var(--font-size-title)`처럼 변수만 사용할 수도 있습니다.

## 폰트와 이미지 상태

- 화면 글꼴: **Noto Sans KR**. 페이지는 시안의 Pretendard 대신 이 글꼴을 사용한다고 명시합니다.
- 손글씨 예시: **Nanum Pen**. `--font-family-handwriting` 및 `type-handwriting`로 참조합니다.
- **폰트 파일은 Figma에 포함되어 있지 않아 내려받지 않았습니다.** 이름만 선언한 상태이며
  사용자의 컴퓨터에 없으면 시스템 글꼴 / cursive로 대체됩니다.
- 실제 웹폰트를 적용하려면 적법하게 사용할 폰트 파일을 `assets/fonts/`에 추가하고
  `@font-face`를 연결해야 합니다. 기존 글자 스타일은 그 후 동일한 이름으로 적용됩니다.
- 안내에 언급된 **동국체 정답 글자 벡터**는 Foundation 페이지에 없으므로 추가하지 않았습니다.
- Foundation의 이미지 채움·아이콘·벡터 노드를 확인한 결과 내보낼 그래픽 에셋은 없었습니다.
