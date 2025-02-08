# MindMate

![image](https://github.com/user-attachments/assets/db386a8b-b089-4d37-9156-d120cfdfefa5)

심리상담 웹사이트 플랫폼

## 📋 프로젝트 설명

마음이 힘든 현대인들을 위한 커뮤니티와 전문가와의 심리 상담 기능을 제공하며, 주변에 위치한 심리 전문 기관과의 접근성을 향상하기 위한 프로젝트입니다.

## 🛠️ 기술 스택

## Tech Stack

### Back-end
![Node.js](https://img.shields.io/badge/Back--end-Node.js-brightgreen)
![Express](https://img.shields.io/badge/Back--end-Express-000000)
![TypeScript](https://img.shields.io/badge/Back--end-TypeScript-007ACC)

### Front-end
![React](https://img.shields.io/badge/Front--end-React-61DAFB)
![TypeScript](https://img.shields.io/badge/Front--end-TypeScript-007ACC)

### Database
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1)

### Authentication
![JWT](https://img.shields.io/badge/Authentication-JWT-000000)
![Nodemailer](https://img.shields.io/badge/Authentication-Nodemailer-008C7F)

### API
![KakaoMap](https://img.shields.io/badge/Map-KakaoMap-FFCD00)
![OpenAI](https://img.shields.io/badge/AI-OpenAI-24A6D9)



## 🚀 설치 방법

프로젝트를 실행할 수 있는 방법을 설명합니다.

1. 저장소를 클론합니다.
   ```bash
   git clone https://github.com/username/project-name.git
   ```

2. 프로젝트 디렉토리로 이동합니다.
   ```bash
   cd project-name
   ```

3. 의존성 패키지를 설치합니다.
   ```bash
   npm install
   ```

4. 개발 서버를 실행합니다.
   ```bash
   npm start
   ```

5. 이제 [http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

## 🔧 기능

**회원가입 및 로그인 기능**: 사용자가 회원가입을 하고, 로그인을 통해 인증을 받습니다. JWT 토큰을 사용하여 로그인 상태를 유지합니다.

**댓글 및 포스트 기능**: 포스트 작성, 수정, 삭제 및 댓글을 통해 사용자가 서로 소통할 수 있는 기능을 제공합니다.

**메일 전송**: 사용자가 이메일을 통해 인증 및 비밀번호 변경을 할 수 있습니다.

**전문가 인증**: 전문가 인증을 통해 사용자의 역할을 변경하거나 정보를 수정할 수 있는 기능을 제공합니다.

## 📷 스크린샷

### 회원 가입
<img src="https://github.com/user-attachments/assets/cd0d287d-c864-41ac-8e91-e050ecef8323" width="300">

### 로그인
<img src="https://github.com/user-attachments/assets/b58b7197-fed2-49d4-a8e5-7a8a8ccc6aa0" width="300">

### 커뮤니티
<img src="https://github.com/user-attachments/assets/dc110ae8-9e81-45c0-ae65-3d6028b577e6" width="600">

### 루틴 관리
<img src="https://github.com/user-attachments/assets/591d208a-2f70-4c19-a003-c39e4f78a285" width="600">



## 📡 API 문서

### Authentication

#### 회원가입
- **경로**: `POST /signup`
- **설명**: 새 사용자가 회원가입을 하기 위한 API. 사용자 정보를 받아 회원을 등록합니다.

#### 아이디 중복검사
- **경로**: `GET /idcheck`
- **설명**: 사용자가 입력한 아이디가 이미 존재하는지 확인합니다. 중복 아이디가 있으면 경고를 반환합니다.

#### 랜덤 닉네임 생성
- **경로**: `GET /random`
- **설명**: 사용자가 원하는 닉네임을 생성할 수 없을 때, 랜덤 닉네임을 생성하여 제공합니다.

#### 로그인
- **경로**: `POST /login`
- **설명**: 기존 사용자가 로그인할 수 있도록 토큰을 발급합니다. 아이디와 비밀번호를 검증하고, 맞다면 JWT 토큰을 반환합니다.

#### 로그인 연장
- **경로**: `POST /loginagain`
- **설명**: 이미 로그인된 사용자가 토큰의 만료 시간을 연장할 수 있습니다. 기존 토큰을 바탕으로 새로운 토큰을 발급합니다.

#### 토큰 유효성 검사
- **경로**: `GET /verify`
- **설명**: 현재 사용자가 가지고 있는 JWT 토큰이 유효한지 확인합니다.

### Comments

#### 댓글 작성
- **경로**: `POST /comment`
- **설명**: 포스트에 댓글을 작성합니다. 사용자가 댓글을 작성할 때 필요한 정보를 전달받아 저장합니다.

#### 댓글 목록 가져오기
- **경로**: `GET /comments`
- **설명**: 포스트에 달린 댓글을 가져옵니다. 특정 포스트에 대한 댓글을 조회할 수 있습니다.

### Mail

#### 메일 보내기
- **경로**: `POST /sendmail`
- **설명**: 사용자가 입력한 메일을 보내는 API입니다. 전문가 인증을 위해 소속 기관 메일로 인증 번호를 발송합니다.

#### 전문가 인증 기반으로 유저 정보 수정
- **경로**: `PATCH /expertauth`
- **설명**: 사용자가 전문가 인증을 받으면 유저 정보를 수정하는 API입니다. 전문가로 인증된 후에 유저 프로필 수정이 가능합니다.

### Post

#### 포스트 작성
- **경로**: `POST /writepost`
- **설명**: 사용자가 새 포스트를 작성하는 API입니다. 포스트에 필요한 제목, 내용 등을 입력받아 작성합니다.

#### 전체 포스트 가져오기
- **경로**: `GET /getallpost`
- **설명**: 모든 포스트를 가져오는 API입니다. 포스트 목록을 반환합니다.

#### 카테고리별 포스트 가져오기
- **경로**: `GET /getpost`
- **설명**: 특정 카테고리에 해당하는 포스트들을 조회하는 API입니다. 사용자는 카테고리별로 포스트를 조회할 수 있습니다.

#### 디테일 포스트로 이동하기
- **경로**: `GET /getsinglepost`
- **설명**: 특정 포스트에 대한 상세 정보를 가져오는 API입니다. 포스트의 상세한 내용을 보여줍니다.

#### 디테일 포스트 정보 가져오기
- **경로**: `GET /getdetailpost`
- **설명**: 포스트의 세부 정보를 가져오는 API입니다. 포스트의 상세 내용을 조회합니다.

#### 포스트 삭제
- **경로**: `DELETE /deletepost`
- **설명**: 사용자가 작성한 포스트를 삭제하는 API입니다. 포스트 ID를 전달받아 해당 포스트를 삭제합니다.

#### 포스트 수정
- **경로**: `PATCH /updatepost`
- **설명**: 사용자가 기존 포스트의 내용을 수정하는 API입니다. 포스트 ID와 수정된 정보를 전달받아 업데이트합니다.


## 🤝 기여 방법

이 프로젝트에 기여하려면 아래 절차를 따르세요.

1. 이 저장소를 포크합니다.
2. 새로운 브랜치를 만듭니다. (예: `git checkout -b feature-name`)
3. 변경 사항을 커밋합니다. (예: `git commit -am 'Add new feature'`)
4. 브랜치를 푸시합니다. (예: `git push origin feature-name`)
5. Pull Request를 생성합니다.

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 확인하세요.

## 📫 연락처

- 이메일: siyunkr@gmail.com
