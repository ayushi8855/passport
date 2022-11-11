import React, { useState } from 'react'
import {useToast} from "@chakra-ui/react";

import { nanoid } from "nanoid";
// import { useNavigate } from "react-router-dom";
import {
    FormControl,
    FormLabel,
   
    FormHelperText,
    Input,
    Box,
    
    Flex,
  } from '@chakra-ui/react'


export const SignUp = () => {
//   const navigate = useNavigate();
//   const { handleAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
   
  });
  const toast = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log("formdata", formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    let userArr = JSON.parse(localStorage.getItem("userDatas")) || [];

    formData.id = nanoid();
    console.log(formData.email)
    if (formData.email !== undefined && formData.password !== undefined){
      if(formData.email.includes("@")){
        if(formData.password.length<8){
          toast({
            title:"password must be of 8 digits",
            status:"info",
            duration:3000,
            isClosable:true
          })
        }
        else{
          userArr.push(formData);
          console.log(userArr, "arrr");
          localStorage.setItem("userDatas", JSON.stringify(userArr));
        //   handleAuth();
          toast({
            title: "Registration successful",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
//    navigate ("/login") 
        }
      }
      else{
        toast({
          title: "enter a valid email",
                  status: "info",
                  duration: 3000,
                  isClosable: true,
        })
      }
    }
    else{
      toast({
        title: "fill all field",
                status: "info",
                duration: 3000,
                isClosable: true,
      })
    }
    }
    

  
  
  return (
   
    <Box maxW='sm' borderWidth='1px' borderRadius='lg'margin="auto" padding="10px" marginTop={100}>
    
        <form onSubmit={handleSubmit}>
        <FormControl >
        
            <Flex >
                <Box>
                
                <FormLabel> Name</FormLabel>
                <Input type='text' 
                 className="firstname"
                 name="name"
                 value={formData.name}
                 onChange={handleChange}
                />
                </Box>
            
                <Box>
                <FormLabel>User Name</FormLabel>
                <Input type='text' 
                 className="lastname"
                 name="username"
                 value={formData.username}
                 onChange={handleChange}
                 />
            </Box>
            
            </Flex>
        <FormLabel>Email address</FormLabel>
        <Input type='email' 
         className="email"
         name="email"
         value={formData.email}
         onChange={handleChange}
        />
     
        <FormHelperText>
          Enter the email you'd like to register.
        </FormHelperText>
      

     <FormLabel>Password</FormLabel>
        <Input type='password'
         className="password"
         name="password"
         value={formData.password}
         onChange={handleChange}
        />
      
        <FormHelperText>
          Enter the password.
        </FormHelperText>
      
        <Input type="submit" value="Sign Up" bg="#3EC70B"></Input>
          
      
        </FormControl>
        </form>
        </Box>
  )
}