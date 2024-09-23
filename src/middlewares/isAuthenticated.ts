import { Response, Request, NextFunction, response } from "express";
import { verify } from "jsonwebtoken";


interface Payload{
    sub: string
}

export function isAuthenticated(
req: Request,
res: Response,
next: NextFunction
){

    //receber o token
    const authToken = req.headers.authorization

    if(!authToken){
        return response.status(401).end()

    }

    const [, token] = authToken.split(" ") 

    try{
        //validar token
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        )as Payload

        //recuperar o id do token e colocar dentro de uma variavel user_id dentro do req (em @types/express/index.d.ts)
        req.user_id = sub
        
        
        return next()


    }catch(err){
        return res.status(401).end()
    }
}