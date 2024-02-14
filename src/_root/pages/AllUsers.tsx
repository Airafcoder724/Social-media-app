import Loadder from "@/components/shared/Loadder";
import UserCard from "@/components/shared/UserCard";
import { toast } from "@/components/ui/use-toast";
import { useGetUsers } from "@/lib/react-query/quiresAndMtations";


const AllUsers = () => {
  const {
    data: creators,
    isPending: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers();

  if(isErrorCreators){
    
    toast({
      title:"Failed to load the Users ! try after sometime "
    })
    return
  }

  return (
   
    <div className="common-container">
     <div className="user-container">
     <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
      {isUserLoading && !creators ? (
        <Loadder/>
      ):(
        <>
        <ul className="user-grid">
        {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        </>
      )}
     </div>
    </div>
  )
}

export default AllUsers