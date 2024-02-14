import GridPostList from "@/components/shared/GridPostList";
import Loadder from "@/components/shared/Loadder";
import { useGetCurrentUSer } from "@/lib/react-query/quiresAndMtations"
import { Models } from "appwrite";


const Saved = () => {
  const {data : currentUser } = useGetCurrentUSer();

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();
  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>
      {!currentUser ? (
        <Loadder />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts.length === 0 ? (
            <p className="text-light-4">No available posts <span>Click on Save button to save posts</span> </p>
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  )
}

export default Saved