'use client'

import {useStore} from "@/store";
import {shallow} from "zustand/shallow";

const Post = () => {
  const {post, setSubtitle} = useStore(store => ({
    post: store.post,
    setSubtitle: store.setSubtitle,
  }),shallow) // You can use shallow function for optimize re-renders if this need

  return (
    <>
      <h2 className="h2">{`Post : ${post.name}`}</h2>
      <h3 className="h3">{post.description.title}</h3>
      <p>{post.description.subtitle}</p>
      <input type="text" value={post.description.subtitle}
             onChange={(e) => setSubtitle(e.target.value)}
      />
    </>
  );
};

export default Post;
