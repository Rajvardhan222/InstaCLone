import { useUserContext } from '@/context/AuthContext';
import React from 'react'
import PostStats from './PostStats';
import { Link } from 'react-router-dom';

function GridPostList({
    posts,
    showUser = true,
    showStats = false,
  }) {

    const { user } = useUserContext();
    console.log(posts);
    
  return (
    <ul className="grid-container">
      {posts.map((post) => {
        console.log(post?.posts)
        
        return <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.posts.$id}`} className="grid-post_link">
            <img
              src={post.posts.imageURl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={
                    post?.posts?.creator?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{post?.posts.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      })}
    </ul>
  )
}

export default GridPostList