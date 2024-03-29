
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useNavigate} from 'react-router-dom'
import { Input } from "@/components/ui/input"
import { SignUpValidation } from "@/lib/validation"
import { z } from "zod"
import Loadder from "@/components/shared/Loadder"
import { Link } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { useCreateAccount, useSignInAccount} from "@/lib/react-query/quiresAndMtations"
import { useUserContext } from "@/context/AuthContext"


const SignUpForm = () => {
  const {toast} = useToast();

  const navigate = useNavigate();
  const {checkAuthUser  } = useUserContext();

  const {mutateAsync:createUserAccount , isPending:isCreatingUser} = useCreateAccount();

  const {mutateAsync:signInAccount  } = useSignInAccount();

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: '',
      username: "",
      email: '',
      password: ''
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
   const newUser = await createUserAccount(values);

   if(!newUser) {
    return  toast({
      title: "Sign up Failed!!! ",
      description: "Check the input fileds",
    })
   }

   const session = await signInAccount({
    email:values.email,
    password:values.password
   })

   if(!session){
    return toast({
      title: "Sign in Failed!!! ",
      description: "Check the input fileds",
    })
   }

   const isLoggedIn = await checkAuthUser();
   if(isLoggedIn){
    form.reset();
    navigate('/')
   }else{
    return toast({title:'Sign up failed '})
   }

  }


  return (
    <Form {...form}>

      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a New account</h2>
        <p className="text-light-3  small-medum md:base-reglar mt-2 ">Enter your details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="  flex gap-5 w-full mt-4 flex-col ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
           
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="shad-button_primary" type="submit">
           {isCreatingUser ? (
            <div className="flex-center gap-2">
              <Loadder /> Loading ...

            </div>
           ):(
            "Sign Up"
           )} 
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2 ">
            Already have an Account ? 
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
          </p>
        </form>
      </div>
    </Form>
  )

}

export default SignUpForm
