# Backend

## Tech Stack

- Express.js
- GraphQL (express-graphql, graphql-upload)
- typeORM
- JWT authorization (cookie, headers parsing)

## 구동방법

> `nodemon`, `gql-merge`, `graphql-to-typescript` global 설치 필요

0. git clone 후 의존성 설치 (eg. `yarn install`)
1. Postgres DB 생성 후, `.env` 환경변수 설정 (`.env_dev` -> `.env`로 변경)

   - DB_NAME (eg. `anypoem`)
   - DB_ENDPOINT (eg. `localhost`)
   - DB_USERNAME (eg. `master`)
   - DB_PASSWORD (eg. `password`)

1. JWT_SECRET_KEY 임의 설정 (eg. `anypoem-secret`)
1. 터미널에서 `yarn dev` 실행

## 기능 (Features)

- [x] 회원가입 (Email), 로그인, 프로필 조회
- [x] 시, 댓글 작성
- [x] 공감 버튼
- [x] Following / Followers
- [x] 모델(Entity) 정의
- [x] 모델(Entity) method 추가
- [x] graphQL type, resolver 추가

## Notes

- 개발 단계에서는 typeORM DB migration 없이 `synchronize: true`

## To-Dos

- [ ] Pagination
