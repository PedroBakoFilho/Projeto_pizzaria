import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface UserRequest{
    name: string
    email: string
    password: string
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){
        
         //verificar se enviou email
         if(!email){
            throw new Error("Email Incorrect")
         }
         //verificar se ja esta cadastrado
         const userAlreadyExist = await prismaClient.user.findFirst({
            where:{
                email : email
            }
         })
         if(userAlreadyExist){
            throw new Error("User already exist")
         }

         const passwordHash = await hash(password, 8) // CRIPTOGRAFANDO A SENHA COM UM SALTO DE 8 

         const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash
            },
     /*O SELECT INFORMA O QUE QUER DEVOLVER*/
            select:{
                id: true,
                name: true,
                email: true
            }
         })

        return user
    }
}

export {CreateUserService}