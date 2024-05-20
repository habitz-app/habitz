# habitz backend porting manual

## 개발환경

- JDK: Azul Zulu JDK 21.30.15
- Spring Boot: 3.2.5
- Gradle: 8.4
- MySQL: 8.3.0-1.el
- Redis: 7.2.4-alpine
- Reverse Proxy: Nginx (Nginx Proxy Manager)
- Gerrit

## 사용한 외부 서비스

### Kakao API

소셜 로그인을 위해 카카오 API를 사용하였습니다. REST API로 개발되었기 때문에 앱 키 발급 후 카카오 로그인 사용을 위한 `OAuth Redirect URI`를 필수로 설정해야 합니다. 관련 설정 방법은 [이 링크](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api)로 대체합니다.

### TossPayments API

결제 서비스를 위해 토스페이먼츠 API를 활용하였습니다. 관련 설정 방법은 [이 링크](https://www.tosspayments.com/)로 대체합니다.

## Docker Compose

개발 시 사용했던 Docker Compose 파일을 수록합니다. docker-compose 폴더를 통해 확인 가능합니다.

- Nginx Proxy Manager
- Jenkins
- MySQL
- Redis

## Jenkins

### Plugins

파이프라인 구축 시 사용했던 주요 플러그인을 수록합니다.

- SSH Agent
- Mattermost Notification
- GitLab
- GitLab Authentication
- GitLab API
- Generic Webhook Trigger

### Global Environment Variables

서비스 운영에 필요한 환경변수를 수록합니다. `Jenkins 관리 → System → Global Properties → Environment Variables`에서 다음 환경 변수들을 입력합니다.

| Key                | Value Example         | Description                                 |
| ------------------ | --------------------- | ------------------------------------------- |
| DB_HOST            | habitz.space          | 데이터베이스 주소를 입력합니다.             |
| DB_NAME            | dev                   | 데이터베이스 이름을 입력합니다.             |
| DB_PORT            | 3306                  | 데이터베이스 환경에 맞는 포트를 입력합니다. |
| DB_USERNAME        | user                  | 사용할 데이터베이스 유저 id 를 입력합니다.  |
| DB_PASSWORD        | password              | 사용할 데이터베이스 비밀번호를 입력합니다.  |
| JWT_SECRET_KEY     | Secret text           | JWT 시크릿 키를 입력합니다.                 |
| KAKAO_ADMIN_KEY    | Secret text           | KAKAO ADMIN KEY 를 입력합니다.              |
| KAKAO_CLIENT_ID    | Secret text           | KAKAO CLIENT ID를 입력합니다.               |
| REDIS_HOST         | habitz.space          | Redis host 주소를 입력합니다.               |
| REDIS_PORT         | 6379                  | Redis port 정보를 입력합니다.               |
| S3_ACCESS_KEY      | Secret text           | S3 Access Key 정보를 입력합니다.            |
| S3_SECRET_KEY      | Secret text           | S3 Secret Key 정보를 입력합니다.            |
| S3_BUCKET_NAME     | habitz                | S3 버킷 이름을 입력합니다.                  |
| S3_BUCKET_REGION   | ap-southeast-2        | S3 Region 주소를 입력합니다.                |
| SWAGGER_SERVER_URL | http://localhost:8080 | Swagger URL 주소를 입력합니다.              |

## Contributing

본 서비스는 한 레포지토리 안에 백엔드 환경과 프론트엔드 환경이 공존하는 형태로 이루어져 있습니다. 개발 컨벤션을 지키기 위해, 이 레포지토리의 루트에는 commit convention을 검사할 `commitlint` 가 설정되어 있습니다. 아래에 본 기능을 활성화시키기 위한 방법을 수록합니다.

## Prerequisites

- Node v20.11.0: git pre-commit을 보다 간편하게 적용하기 위해 Node.js환경의 [husky](https://typicode.github.io/husky/)를 사용하였습니다. 따라서 본 과정을 수행하기 위해서는 Node가 필요합니다.
- pnpm v9.1.1: pnpm은 Node환경의 npm을 대체하는 Package Manager중 하나입니다. 본 프로젝트에서는 pnpm을 기본 패키지 매니저로 사용하였기에 필요합니다.

### How to Install

1. root 폴더에서 다음 명령어를 실행합니다.

```bash
pnpm install
```
