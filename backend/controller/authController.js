const User = require('../model/user');
const brand = require('../model/brand');
const product = require('../model/product');
const path = require('path');
const mongoose = require("mongoose");
const router = require('../routes/authRoutes');


exports.register = async(req,res)=>{
    try{
        const {username,email,password,gender,mobile} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message:"User already exist"});

        const newUser = new User({username,email,password,gender,mobile});
        await newUser.save();

        res.status(201).json({message:"User registered successfully", user:newUser});
    } catch(error) {
        res.status(500).json({message:error.message})
    }
} ;

exports.login = async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        if(user.password !=password){
            return res.status(400).json({message:"Invalid email or password"});
        }
        return res.status(200).json({message:"Login successfull",user});

    }catch(error){
        res.status(500).json({message:error.message});
    }
}

exports.brand = async(req,res)=>{
    try{
        const {ownername,brandname,phone,city,status} = req.body;
        const existingBrand = await brand.findOne({brandname});
        if (existingBrand) return res.status(400).json({message:"Brand already exist"});
        const newBrand = new brand({ownername,brandname,phone,city,status});
        await newBrand.save();

        res.status(201).json({message:"Brand registered successfully", brand:newBrand});
    } catch(error) {
        res.status(500).json({message:error.message})
    }
} ;


exports.product = async (req, res) => {
    try {
        const { productname, brandname, description, price } = req.body; // Add price
        const existingProduct = await product.findOne({ productname });
        if (existingProduct) {
            return res.status(400).json({ message: "Product already exists" });
        }

        const imagePath = req.file ? req.file.filename : null;

        const newProduct = new product({
            productname,
            brandname,
            description,
            image: imagePath,
            price  // Save price to the database
        });

        await newProduct.save();
        res.status(201).json({ message: "Product registered successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  


exports.putProduct = async (req, res) => {
    try {
        const productId = req.params.id.trim(); // Trim any extra spaces
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        // Find the existing product
        const existingProduct = await product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Check if an image file is included in the request
        if (req.file) {
            existingProduct.image = req.file.filename; // Update the image if a new one is uploaded
        }

        // Update other fields from the request body
        Object.assign(existingProduct, req.body);

        // Save the updated product
        const updatedProduct = await existingProduct.save();

        res.status(200).json({ success: true, product: updatedProduct, message: "Product updated successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const products = await product.find({}, 'productname brandname description image price'); // Include price
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};







exports.getBrand = async(req,res)=>{
    try{
        const brands = await brand.find();
        res.status(200).json({brands});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

exports.putBrand = async(req,res)=>{
    try {
        const updatedBrand = await brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBrand) return res.status(404).json({ success: false, message: "Brand not found" });
        res.status(200).json({ success: true, brand: updatedBrand, message: "Brand updated successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.deleteBrand = async(req,res)=>{
    try {
        const deletedBrand = await brand.findByIdAndDelete(req.params.id);
        if (!deletedBrand) return res.status(404).json({ success: false, message: "Brand not found" });
        res.status(200).json({ success: true, message: "Brand deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting brand" });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id.trim(); // Trim any extra spaces
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        const deletedProduct = await product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting product" });
    }
};



