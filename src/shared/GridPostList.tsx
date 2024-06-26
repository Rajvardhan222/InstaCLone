import { useUserContext } from '@/context/AuthContext';
import React from 'react'
import PostStats from './PostStats';
import { Link } from 'react-router-dom';

function GridPostList({
    posts,
    showUser = true,
    showStats = true,
  }) {

    const { user } = useUserContext();
    //posts);
    
  return (
    <ul className="grid-container">
      {posts.map((post,index) => (
        <li key={index} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img
              src={post.imageURl}
              alt="post"
              className="h-[100%] w-full object-cover"
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={
                    post?.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default GridPostList