# 개발환경

- Node: 20.12.0
- pnpm: 8.15.5
- Next.js: 14.1.3

# Dotenv

본 프로젝트의 `frontend`폴더 안에는 `.env.example` 파일이 있습니다. 해당 파일에 `.env`파일에 수록되어야 할 민감 정보의 Key가 입력되어 있습니다. `.env`파일을 생성 후 `.env.example`파일에 기재된 Key에 대한 Value를 입력해야 합니다. 입력되어야 할 정보는 다음과 같습니다.

```toml
SERVER_URL=
TOSS_SECRET_KEY=

NEXT_PUBLIC_KAKAO_SDK_KEY=
NEXT_PUBLIC_KAKAO_REDIRECT_URL=
NEXT_PUBLIC_TOSS_CLIENT_KEY=
NEXT_PUBLIC_TOSS_REDIRECT_URL=
```

| Key                            | Value Example         | Description                        |
| ------------------------------ | --------------------- | ---------------------------------- |
| SERVER_URL                     | server url            | 백엔드 서버 주소를 입력합니다.     |
| TOSS_SECRET_KEY                | Secret text           | 토스 결제 시크릿 키를 입력합니다.  |
| NEXT_PUBLIC_KAKAO_SDK_KEY      | Secret text           | 카카오 SDK를 입력합니다.           |
| NEXT_PUBLIC_KAKAO_REDIRECT_URL | http://localhost:3000 | 카카오 Redirect URL 을 입력합니다. |
| NEXT_PUBLIC_TOSS_CLIENT_KEY    | Secret text           | 토스 결제 Client Key를 입력합니다. |
| NEXT_PUBLIC_TOSS_REDIRECT_URL  | http://localhost:3000 | 토스 Redirect URL 을 입력합니다.   |

# Contributing

본 서비스는 한 레포지토리 안에 백엔드 환경과 프론트엔드 환경이 공존하는 형태로 이루어져 있습니다. 개발 컨벤션을 지키기 위해, 이 레포지토리의 루트에는 commit convention을 검사할 `commitlint`와 Java 환경에서의 `Checkstyle`을 체크하기 위한 `pre-commit`이 설정되어 있습니다. 아래에 본 기능을 활성화시키기 위한 방법을 수록합니다.

## Prerequisites

- Node v20.12.0: git pre-commit을 보다 간편하게 적용하기 위해 Node.js환경의 [husky](https://typicode.github.io/husky/)를 사용하였습니다. 따라서 본 과정을 수행하기 위해서는 Node가 필요합니다.
- pnpm v8.15.5: pnpm은 Node환경의 npm을 대체하는 Package Manager중 하나입니다. 본 프로젝트에서는 pnpm을 기본 패키지 매니저로 사용하였기에 필요합니다.

## How to Install

1. root 폴더에서 다음 명령어를 실행합니다.

```bash
pnpm install
```

1. frontend 폴더로 이동한 후 다음 명령어를 실행합니다.

```bash
pnpm install
```

1. dev환경으로 테스트하고자 할 경우 다음 명령어를 실행합니다.

```bash
pnpm dev
```
