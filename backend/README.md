# Backend

## Tech Stack

- Express.js
- GraphQL (express-graphql, graphql-upload)
- typeORM
- JWT authorization (cookie, headers parsing)

## 기능 (Features)

- [x] 회원가입 (Email), 로그인, 프로필 조회
- [ ] 시, 댓글 작성
- [ ] 공감 버튼
- [ ] Following / Followers

## Notes

- 개발 단계에서는 typeORM DB migration 없이 `synchronize: true`

## To-Dos

- [x] 모델(Entity) 정의
- [ ] 모델(Entity) method 추가
- [ ] graphQL type, resolver 추가
