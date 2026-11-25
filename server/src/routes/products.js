import {Router} from 'express';import {Product} from '../models.js';import {protect,admin} from '../middleware.js';
const r=Router();
r.get('/',async(req,res,next)=>{try{const f={};if(req.query.search)f.name={$regex:req.query.search,$options:'i'};if(req.query.category&&req.query.category!=='All')f.category=req.query.category;res.json(await Product.find(f).sort({createdAt:-1}));}catch(e){next(e);}});
r.get('/:id',async(req,res,next)=>{try{const p=await Product.findById(req.params.id);if(!p)return res.status(404).json({message:'Product not found'});res.json(p);}catch(e){next(e);}});
r.post('/',protect,admin,async(req,res,next)=>{try{res.status(201).json(await Product.create(req.body));}catch(e){next(e);}});
r.put('/:id',protect,admin,async(req,res,next)=>{try{const p=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!p)return res.status(404).json({message:'Product not found'});res.json(p);}catch(e){next(e);}});
r.delete('/:id',protect,admin,async(req,res,next)=>{try{await Product.findByIdAndDelete(req.params.id);res.json({message:'Deleted'});}catch(e){next(e);}});
export default r;
