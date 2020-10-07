// importing
import express from 'express'; 
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from "pusher";
import cors from 'cors';
//app config

const app=express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: '1083486',
    key: '70d9201f8c151de93347',
    secret: '2618218ffd118badf74f',
    cluster: 'eu',
    encrypted: true
  });

//midddlewares

app.use(express.json());
app.use(cors());
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
})


//DbConfig
const connection_url='mongodb+srv://admin:cMQc5Dn5l9DeIvRk@cluster0.vxak2.mongodb.net/LetsChat?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
});

//
const db=mongoose.connection
db.once('open',()=>{
    console.log("DB connected");

    const msgCollection=db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change)=>{
        console.log(change);

        if(change.operationType == 'insert'){
            const messageDetails= change.fullDocument;
            pusher.trigger("messages","inserted",{
                name:messageDetails.name,
                messages:messageDetails.messages,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received
            });
        }else{
            console.log("error triggering pusher");
        }
    })

})

//api routes
app.get('/',(req,res)=>res.status(200).send('hello world'));


app.post('/messages/new',(req,res)=>{
    const dbMessage =req.body;

    Messages.create(dbMessage, (err,data)=>{
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
});

app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
});

//listen
app.listen(port,()=>console.log(`listening on local host:${port}`));