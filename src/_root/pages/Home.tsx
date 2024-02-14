import Loadder from "@/components/shared/Loadder";
import PostCard from "@/components/shared/PostCard";
import UserCard from "@/components/shared/UserCard";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/quiresAndMtations";
import { Models } from "appwrite";

const Home = () => {
  const {data : posts , isPending:isPostLoading  } = useGetRecentPosts();
 

    const {
        data: creators,
        isPending: isUserLoading
      } = useGetUsers();
    
      
 
  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
          <h2 className='h3-bold md:h2-bold w-full text-left '>Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loadder/>
          ):(
          <>
            <ul  className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post:Models.Document)=>(
               <PostCard post={post}/>
              ))}
            </ul>
          </>)}
        </div>
      </div>
      <div className="home-creators">
      <h3 className="h3-bold text-light-1">Top Creators</h3>
      {isUserLoading && !creators ? (
          <Loadder />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}


export default Home
