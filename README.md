# wanted-pre-onboarding-backend

## 구현 과정

이전의 프로젝트를 진행할 때 디렉토리 구조는 controllers, services, models, shemas 등으로 파일을 관리했습니다.
그러나 이 구조의 단점은 유지, 보수할 때 user에 관한 것을 수정하려면 모든 폴더를 열어서 파일을 찾아가며 코드를 변경하는 불편함을 겪었습니다.
그래서 user 폴더 내에 user와 관련된 controller, service, model 파일을 생성하여 유지, 보수에 편리하도록 구성했습니다.

**1. ERD 작성**

![채용 웹서비스 ERD](./docs/wanted-ERD.PNG)

sequelize의 paranoid: true로 하여 soft delete를 구현했습니다.
그래서 ERD에도 created_at과 deleted_at을 추가했습니다.
채용 마감일은 상시 채용 형태가 있기 때문에 NULL을 허용했습니다.

**2. 엔티티 작성**

ERD를 참고하여 유저, 채용공고, 회사, 지원내용에 대한 엔티티(Entity)를 작성했습니다.
DB를 연결하고 서버를 켜면 sequelize를 통해 자동으로 DB에 테이블이 형성됩니다.

## 요구 사항

### 1. 채용공고를 등록합니다.

```javascript
createPost: async ({ newPostData }) => {
    try {
      const post = await PostModel.create({ newPostData });

      return { message: '게시글 생성에 성공했습니다.', post };
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw error;
      } else {
        throw new InternalServerError('게시물 작성을 실패했습니다.');
      }
    }
  },
```

### 2. 채용공고를 수정합니다.

### 3. 채용공고를 삭제합니다.

### 4-1. 채용공고 목록을 가져옵니다.

### 4-2. 채용공고 검색 기능 구현

### 5. 채용 상세 페이지를 가져옵니다.

### 6. 사용자는 채용공고에 지원합니다.
