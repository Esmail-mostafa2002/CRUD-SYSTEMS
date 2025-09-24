import express from "express";
import mongoose from "mongoose";
import Product from "./models/product.model.js" 

const app = express();

app.use(express.json());




app.get('/api/products',async(req,res)=>{
    try{
        const products = await Product.find();
        res.status(200).send(products);
        console.log(products);

    }catch(err){
        res.status(500).send({message: err.message})
    }
})

app.get('/api/products/:id',async(req,res)=>{
    try{
        const {id}= req.params;
        const product = await Product.findById(id);
       
            res.status(200).send(product);
        
    }catch(err){
    res.status(500).send({message: err.message})

}
});
app.put('/api/products/:id',async(req,res)=>{
    try{
        const {id}= req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).send({message: 'Product not found'});
        }
      }catch(err){
        res.status(500).send({message: err.message})

}
});
app.post('/api/products',async(req,res)=>{
   try{
    const product =await Product.create(req.body);
    
    res.status(201).send(product);



   }catch(err){
    res.status(500).send({message: err.message})
   }
})
app.delete('/api/products/:id',async(req,res)=>{
    try{
        const {id}= req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).send({message: 'Product not found'});
        }
        res.status(200).send({message: 'Product deleted successfully'});
    }catch(err){
        res.status(500).send({message: err.message})

    }
})

mongoose.connect('mongodb://localhost:27017/iti-alex', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log("Error connecting to MongoDB", err);
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000" )
});