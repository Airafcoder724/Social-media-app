import Loadder from '@/components/shared/Loadder';
import PostStats from '@/components/shared/PostStats';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/AuthContext';
import { useGetPostByID } from '@/lib/react-query/quiresAndMtations'
import { multiFormatDateString } from '@/lib/utils';
import React from 'react'
import { Link, useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostByID(id || '');
  const {user} = useUserContext();

  const handleDeletePost =()=>{}

  return (
    <div className='post_details-container'>
      {isPending ? <Loadder /> : (
        <div className='post_details-card'>
          <img src={post?.imageUrl} alt="post image" className='post_details-img' />
          <div className="post_details-info">
            <div className='flex-between w-full'>

            
            <Link to={`/profile/${post?.creator.$id}`} className='flex items-center gap-3'>
              <img
                src={
                  post?.creator?.imageUrl ||
                  "/assets/icons/profile-placeholder.svg"
                }
                alt="creator"
                className="w-8 h-8 rounded-full lg:w-12 lg:h-12 lg:rounded-full"
              />
          

            <div className="flex flex-col ">
              <p className="base-medium lg:body-bold text-light-1">
                {post?.creator.name}
              </p>
              <div className="flex-center text-light-3 gap-3">
                <p className="subtle-semibold lg:small-regular">
                  {multiFormatDateString(post?.$createdAt)}
                </p>
                -
                <p className="subtle-semibold lg:small-regular">
                  {post?.location}
                </p>
              </div>
            </div>
            </Link>
            <div className='flex-center gap-4 '>
              <Link to={`/update-post/${post?.$id}`} className={`${user.id !==post?.creator.$id} "hidden`}>

                <img src="/assets/icons/edit.svg" width={24} height={24} alt="edit" />
              </Link>

              <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ost_details-delete_btn ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}>
                  <img
                    src={"/assets/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
            </div>
            </div>
            <hr className='border w-full border-dark-4/80'/>
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular  ">
                    <p className="">
                        {post?.caption}
                    </p>
                    <ul className="flex gap-1 mt-2">
                        {post?.tags.map((tag:string)=>(
                            <li key={tag} className="text-light-3">
                                #{tag}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='w-full '>
                    <PostStats post={post} userId={user.id} />
                </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetail