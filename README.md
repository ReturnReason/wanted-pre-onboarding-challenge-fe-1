## 원티드 프리온보딩 챌린지 💙
[💙 프론트엔드 사전과제](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api)

<br/>

> ## 사용한 기술 스택 🛠
<img src="https://img.shields.io/badge/HTML-E34F26?style=flat-round&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-round&logo=CSS3&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-FF9A00?style=flat-round&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/styledComponents-DB7093?style=flat-round&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/React-6EC0EB?style=flat-round&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/React Router-6B99F0?style=flat-round&logo=React Router&logoColor=white"/> <img src="https://img.shields.io/badge/RTK Query-764ABC?style=flat-round&logo=Redux&logoColor=white"/>

<br/>

> ## 지원자 정보 🙋‍♀️

이유 
<br/>
reasonz@daum.net

<br/>

> ## Preview

#### - 메인('/') 화면 <br/>

![Honeycam 2023-01-04 19-58-50](https://user-images.githubusercontent.com/48672106/210657641-d0f50e1b-1fc6-4858-9a8e-6ef0038c2c2a.gif)


#### - 로그인하지 않은 경우 /Todo 경로 접근 불가, 
#### - 로그인 페이지로 리다이렉트 <br/>

![Honeycam 2023-01-05 06-25-44](https://user-images.githubusercontent.com/48672106/210657780-27ea2643-134f-49a3-8cea-d816efe46b7f.gif)

#### - 이메일 및 패스워드를 충족하는 경우에만 회원가입 후 토큰 저장 <br/>

![Honeycam 2023-01-05 06-32-27](https://user-images.githubusercontent.com/48672106/210657899-1bc14e53-cc04-4ed9-832d-9b0dc61553e6.gif)

#### - 로그인 페이지 <br/>

![Honeycam 2023-01-05 06-33-55](https://user-images.githubusercontent.com/48672106/210658205-ff17f595-28ce-4b87-a98e-04d4cae69e14.gif)

#### - Todo 작성 <br/>

![Honeycam 2023-01-05 06-37-44](https://user-images.githubusercontent.com/48672106/210658242-37534247-e301-4aba-b027-e20248e7a81e.gif)

#### - Todo 삭제 <br/>

![Honeycam 2023-01-05 06-38-06](https://user-images.githubusercontent.com/48672106/210658288-6023513f-46c3-4e6a-bf1d-cf5ce5b893c3.gif)

#### - Todo 조회 <br/>

![Honeycam 2023-01-05 06-41-23](https://user-images.githubusercontent.com/48672106/210658353-0ec355b6-376e-442e-a871-0d9701e41d5c.gif)

#### - Todo 수정 <br/>

![Honeycam 2023-01-05 06-42-50](https://user-images.githubusercontent.com/48672106/210658408-0955d811-6c3b-4c4a-af57-cf3d6ea232cb.gif)

#### - 로그아웃 <br/>

![Honeycam 2023-01-05 06-43-08](https://user-images.githubusercontent.com/48672106/210658467-1c530272-c10f-4445-9c35-7644a90e9f7f.gif)


<br/>

## ✅ 클라이언트 구현 과제 진행 여부 체크
### (Login / SignUp) 기능 구현 목록

- /auth 경로에 로그인 / 회원가입 기능을 개발한다.

  - [x] 이메일, 비밀번호 input, 제출 button을 갖도록 구성한다.

- 이메일과 비밀번호의 유효성을 확인한다.

  - [x] 이메일은 최소 `@`, `.` 포함하도록 한다.
  - [x] 비밀번호는 8자 이상 입력해야 한다.

- 로그인 API를 호출하고 올바른 응답을 받으면 루트 경로로 이동시킨다.
  - [x] 응답으로 받은 토큰은 로컬 스토리지에 저장한다.
  - [x] 다음 번 로그인 시 토큰이 존재하는 경우 루트 경로로 리다이렉트 시킨다.
  - [x] 토큰이 유효하지 않은 경우 사용자에게 알린 후 로그인 페이지로 리다이렉트 시킨다.

### (Todo List) 기능 구현 목록

- Todo List API를 호출하여 Todo List CRUD 기능울 구현한다.

  - [x] 목록, 상세 영역으로 나누어 구현한다.
  - [x] TODO 목록을 확인할 수 있다.
  - [x] TODO 추가 버튼을 클릭 하면 할 일을 추가할 수 있다.
  - [x] TODO 수정 버튼을 클릭하면 수정 모드가 활성화된다.
    - [x] 수정 모드에서 내용을 제출(수정)하거나 취소할 수 있다.
  - [x] TODO 삭제 버튼을 클릭하면 해당 TODO를 삭제할 수 있다.

- 한 화면 내에서 TODO LIST와 개별 TODO의 상세를 확인할 수 있어야 한다.

  - [x] 새로고침 했을 때 현재 상태가 유지되어야 한다.
  - [ ] 개별 TODO를 조회 순서에 따라 페이지 뒤로가기를 통해 조회할 수 있어야 한다.

- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖춰야 한다.
  - [x] 수정되는 TODO의 내용이 목록에 실시간으로 반영되어야 한다.

### 기타

- [x] 로그아웃은 로컬 스토리지에 저장된 토큰을 삭제시킨다.
