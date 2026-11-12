import express from 'express';import cors from 'cors';
const app=express();app.use(cors({origin:'http://localhost:5173'}));app.use(express.json({limit:'100kb'}));
app.get('/api/health',(_req,res)=>res.json({ok:true,service:'mathforge-api',version:'0.1.0'}));
app.get('/api/v1/status',(_req,res)=>res.json({phase:1,mode:'local-first',auth:false,cloudSync:false}));
const port=Number(process.env.PORT||4000);app.listen(port,()=>console.log(`MathForge API listening on ${port}`));
