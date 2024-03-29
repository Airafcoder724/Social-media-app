import { useQuery , useMutation , useQueryClient , useInfiniteQuery} from "@tanstack/react-query";
import { UpdatePost, createPost, createUserAccount, deletePost, deleteSavedPost, getCurrentUser, getInfinitePosts, getPostByID, getRecentPosts, getUserById, getUsers, likedPost, savePost, searchPosts, signInAccount, signOutAccount, updateUser } from "../appwrite/api";
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from "@/types";
import { QUERY_KEYS } from "./queryKeys";



export const useGetPosts = () => {
    return useInfiniteQuery({
      queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
      queryFn: getInfinitePosts as any,
      initialPageParam: null,
      getNextPageParam: (lastPage: any) => {
        // If there's no data, there are no more pages.
        if (lastPage && lastPage.documents.length === 0) {
          return null;
        }
  
        // Use the $id of the last document as the cursor.
        const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
        return lastId;
      },
    });
};

export const useSearchPosts = (searchTerm: string) => {
    return useQuery({
      queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
      queryFn: () => searchPosts(searchTerm),
      enabled: !!searchTerm,
    });
};
  

export const useCreateAccount =() =>{
    return useMutation({
        mutationFn: (user :INewUser)=> createUserAccount(user)
    })
}

export const useSignInAccount =() =>{
    return useMutation({
        mutationFn: (user :{
            email:string , password:string;
        })=> signInAccount(user)
    })
}

export const useSignOutAccount =() =>{
    return useMutation({
        mutationFn:  signOutAccount
    })
}


export const useCreatePost =()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:(post:INewPost)=>createPost(post),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}

export const useGetRecentPosts =()=>{
    return useQuery({
        queryKey:[QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts,
        
    })
}

export const useLikePost=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({postId ,likesArray} : {postId :string , likesArray:string[]})=> likedPost(postId ,likesArray),
        onSuccess:(data)=>{
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POST_BY_ID , data?.$id]
            })

            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS ]
            })
            
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POSTS ]
            })

            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_CURRENT_USER ]
            })
        }
    })
}

export const useSavePost=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({postId ,userId} : {postId :string , userId:string})=> savePost(postId ,userId),
        onSuccess:()=>{
            
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS ]
            })
            
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POSTS ]
            })

            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_CURRENT_USER ]
            })
        }
    })
}

export const useDeleteSavedPost=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({savedRecordId} : {savedRecordId :string })=> deleteSavedPost(savedRecordId),
        onSuccess:()=>{
           
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS ]
            })
            
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POSTS ]
            })

            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_CURRENT_USER ]
            })
        }
    })
}

export const useGetCurrentUSer =()=>{
    return useQuery ({
        queryKey:[QUERY_KEYS.GET_CURRENT_USER],
        queryFn:getCurrentUser
    })
}

export const useGetPostByID =(postId:string)=>{
    return useQuery({
        queryKey:[QUERY_KEYS.GET_POST_BY_ID ,postId ],
        queryFn:()=>getPostByID(postId),
        enabled:!!postId
    })
}

export const useUpdatePost =()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:(post:IUpdatePost)=>UpdatePost(post),
        onSuccess:(data)=>{
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POST_BY_ID , data?.$id]
            })
        }
    })
}

// export const useDeletePost =()=>{
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn:({postId , imageId} :{postId:string , imageId:string})=>deletePost(postId , imageId),
//         onSuccess:()=>{
//             queryClient.invalidateQueries({
//                 queryKey:[QUERY_KEYS.GET_RECENT_POSTS ]
//             })
//         }
//     })
// }

export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) =>
        deletePost(postId, imageId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };
  

export const useGetUsers = () => {
    return useQuery({
      queryKey: ["getUsers"],
      queryFn: getUsers,
    });
  };
 
export const useUserByID= (id :string)=>{
    return useQuery({
        queryKey:[QUERY_KEYS.GET_USER_BY_ID ,id ],
        queryFn:()=>getUserById(id),
        enabled:!!id
    })
}  

export const useUpdateUser = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (user: IUpdateUser) => updateUser(user),
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
        });
      },
    });
  };