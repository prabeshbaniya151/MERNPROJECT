import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({name:{type:String,required:true},email:{type:String,unique:true,required:true,lowercase:true},password:{type:String,required:true},role:{type:String,enum:['customer','admin'],default:'customer'}},{timestamps:true});
const productSchema=new mongoose.Schema({name:{type:String,required:true},description:{type:String,required:true},price:{type:Number,required:true,min:0},category:{type:String,required:true},image:String,stock:{type:Number,default:0,min:0},featured:{type:Boolean,default:false}},{timestamps:true});
const orderSchema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},items:[{product:mongoose.Schema.Types.ObjectId,name:String,image:String,price:Number,quantity:Number}],shippingAddress:{fullName:String,phone:String,address:String,city:String,postalCode:String},totalAmount:Number,paymentMethod:{type:String,default:'Cash on Delivery'},status:{type:String,enum:['Pending','Processing','Shipped','Delivered','Cancelled'],default:'Pending'}},{timestamps:true});
export const User=mongoose.model('User',userSchema);
export const Product=mongoose.model('Product',productSchema);
export const Order=mongoose.model('Order',orderSchema);
