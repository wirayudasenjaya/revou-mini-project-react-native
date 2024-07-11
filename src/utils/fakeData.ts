import { faker } from '@faker-js/faker';

export const generateFakeNewsFeedData = (num: number) => {
  const fakeData = [];
  for (let i = 0; i < num; i++) {
    fakeData.push({
      avatar_url: faker.image.avatar(),
      name: faker.person.fullName(),
      headline: faker.person.jobTitle(),
      created_at: faker.date.recent(),
      post_header: faker.lorem.sentence(),
      post_content: faker.lorem.paragraph(),
      post_topic: faker.lorem.word(),
      post_upvote: faker.number.int({ min: 0, max: 1000 }),
      post_downvote: faker.number.int({ min: 0, max: 1000 }),
      post_comment: faker.number.int({ min: 0, max: 500 }),
    });
  }
  return fakeData;
};
