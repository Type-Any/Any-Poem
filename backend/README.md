# Backend

## Tech Stack

- Express.js
- GraphQL (express-graphql, graphql-upload)
- typeORM
- JWT authorization (cookie, headers parsing)

## 구동방법

### Docker를 사용하지 않는 경우

0. `nodemon` global 설치 필요

```shell
$ yarn global add nodemon
```

1. git clone 후 의존성 설치

```shell
$ git clone https://github.com/Type-Any/Any-Poem.git
$ cd Any-Poem
$ yarn install
```

2. Postgres DB 생성

> 참고 : [Commands for Postgres DB initial setup](https://mattdamon108.github.io/post/backend/1/2019-02-25-Commands-for-Postgres-DB-setup/)

3. `.env` 환경변수 설정 (`.env_dev` -> `.env`로 변경)

```
JWT_SECRET_KEY=anypoem-secret
DB_NAME=anypoem
DB_ENDPOINT=localhost
DB_USERNAME=anypoem
DB_PASSWORD=anypoem
```

4. 터미널에서 `yarn dev` 실행

### Docker를 사용하는 경우

1. git clone

```shell
$ git clone https://github.com/Type-Any/Any-Poem.git
$ cd Any-Poem
```

2. Postgres DB 생성

> 참고 : [Commands for Postgres DB initial setup](https://mattdamon108.github.io/post/backend/1/2019-02-25-Commands-for-Postgres-DB-setup/)

3. `.env` 환경변수 설정 (`.env_dev` -> `.env`로 변경)

```
JWT_SECRET_KEY=any-poem
DB_NAME=anypoem
DB_ENDPOINT=host.docker.internal
DB_USERNAME=anypoem
DB_PASSWORD=anypoem
```

4. Docker build

```shell
$ docker build -t any-poem .
```

5. Docker run

```shell
$ docker run -p 4000:4000 -d any-poem
```

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
- [ ] Preparation of deploy using docker
