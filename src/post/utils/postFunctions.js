function modifyPostObject(post) {
  const modifiedPost = {
    ...post.toJSON(),
    otherPosts: post.Company.Posts.map(post => post.id), // 해당 채용공고를 제외한 같은 회사의 다른 채용공고들
  }; // Sequelize 모델 인스턴스를 자바스크립트 객체로 바꾸기

  delete modifiedPost.Company; // 불필요한 회사 정보 없애기

  return modifiedPost;
};

export { modifyPostObject }