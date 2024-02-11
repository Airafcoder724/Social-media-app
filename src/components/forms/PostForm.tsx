import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { Models } from "appwrite"
import { useUserContext } from "@/context/AuthContext"
import {  useToast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/quiresAndMtations"

type postFormProps = {
    post?:Models.Document,
    action:'Create' | 'Update'
}

const PostForm = ({post , action} :postFormProps) => {
   
    const {user} = useUserContext();
    const {toast} = useToast();
    const navigate = useNavigate();
    // create post 
    const {mutateAsync : createPost , isPending :IsLoadingCreate} = useCreatePost();

    // updatepost 
    const {mutateAsync : updatePost , isPending :IsLoadingUpdate} = useUpdatePost();

    // 1. Define your form.
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post?.caption :"",
            file:[],
            location :post ? post?.location :"",
            tags:post ? post?.tags.join(",") :"",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof PostValidation>) {
        if(post && action === 'Update'){
            const updatedPost = await updatePost({
                ...values,
                postId:post.$id,
                imageId:post?.imageId,
                imageUrl:post?.imageUrl
            })

            if(!updatedPost){
                toast({
                    title:"Failed to update ! Sorry"
                })
            }

            return navigate(`/posts/${post.$id}`)
        }
        const newPost  = await createPost({
            ...values,
            userId : user.id
       })
       console.log(newPost)
       if(!newPost){
        return toast({
            title:'Something is Wrong ,Try again'
        })
    }
       navigate("/");


        
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full mx-w-5xl">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Caption</FormLabel>
                            <FormControl>
                                <Textarea className="shad-textarea custom-scrollbar" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Photos</FormLabel>
                            <FormControl>
                                <FileUploader
                                filedChange={field.onChange}
                                mediaUrl={post?.imageUrl} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Location</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Tags</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} placeholder="Art , Web3 , AI" />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}

                />

                <div className="flex gap-4 items-center justify-end">
                <Button 
                type="button" 
                className="shad-button_dark_4">
                    Cancel
                </Button>
                <Button type="submit" disabled={IsLoadingCreate || IsLoadingUpdate} className="shad-button_primary whitespace-nowrap">
                {IsLoadingCreate || IsLoadingUpdate && "Loading ..."}
                 {action} post
                </Button>
                </div>
            </form>
        </Form>
    )
}

export default PostForm