import { Request, Response } from "express";

const apiKeyValue = process.env.API_KEY;
export const validateKey=(key:string)=>{
    return apiKeyValue === key;
}

export const validateKeyMiddleware = (req:Request, res:Response, next)=>{
    let {apikey = 'NA'} = req.headers;
    apikey = apikey.toString();
    if(apikey === 'NA'){
        return res.status(401).json({error: 'API key must be provided'})
    }
    if(!validateKey(apikey)){
        return res.status(401).json({error: 'API key provided failed'})
    }

    return next();
}