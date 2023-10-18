import { postService } from '../postService.js'
import { PostModel } from '../postModel.js';
// import { ApplicationModel } from '../src/application/applicationModel.js'
// import { ConflictError, InternalServerError, NotFoundError } from '../src/middlewares/errorMiddleware.js';
// import { modifyPostObject } from '../src/post/utils/postFunctions.js';

jest.mock('../src/post/postModel.js')
jest.mock('../src/application/applicationModel.js')

describe('postService CRUD API testing', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('createPost', () => {
    it('채용공고 생성하기', async () => {
      const newPostData = {
        title: "제목17",
        companyName: "company A",
        country: "한국",
        requirement: "신입",
        salary: 3000000,
        education: "대졸",
        location: "서울 판교",
        position: "백엔드",
        skill: "Typescript",
        award: 1000000,
        type: "정규직",
        description: "회사 설명",
        deadline: "2023-05-03",
        companyId: 1
      }
      const createPost = { id: 1, ...newPostData }
      PostModel.create.mockResolvedValue(createPost)

      const result = await postService.createPost(newPostData);

      expect(result.message).toBe('게시글 생성에 성공했습니다.');
      expect(result.post).toBeDefined();
    });

    it('채용공고 목록 가져오기', async () => {
      const allPosts = [
        { id: 1, title: 'Post 1', description: "description 1" },
        { id: 2, title: 'Post 2', description: "description 2" }
      ]

      PostModel.findAll.mockResolvedValue(allPosts)

      const result = await postService.getAllPosts()

      expect(PostModel.findAll).toHaveBeenCalled()
      expect(result).toEqual(allPosts)
    })

    it('채용공고 상세페이지 조회', async () => {
      const postId = 1
      const toUpdate = { title: 'Updated Post' }

      PostModel.update.mockResolvedValue([1])

      const result = await postService.updatePost(postId, toUpdate)

      expect(PostModel.update).toHaveBeenCalledWith(toUpdate, { where: { id: postId } });
      expect(result).toEqual({ message: 'Post updated successfully' });
    })
  })


});
