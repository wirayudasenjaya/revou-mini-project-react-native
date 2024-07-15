import React, { ReactNode, createContext, useState } from 'react';

import { PostProps } from './types';

type PostContextProps = {
  posts: PostProps[];
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>;
}

const PostContext = createContext<PostContextProps>({
  posts: [],
  setPosts: () => {}
});

const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<PostProps[]>([]);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
