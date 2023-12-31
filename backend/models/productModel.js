const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: { type: String, required: [true, "Please enter your product name!"] },
	description: { type: String, required: [true, "Please enter your product description!"] },
	category: { type: String, required: [true, "Please enter your product category!"] },
	originalPrice: { type: Number, required: [true, "Please enter your product price!"] },
	discountPrice: { type: Number },
	stock: { type: Number, required: [true, "Please enter your product stock!"] },
	images: [{
		public_id: { type:String, },
		url: { type:String, },
	}],
	shop: {
		type: mongoose.Types.ObjectId,
        ref: "Shop",
		required: true,
	},
	reviews: [
		{
			customer: { 
				type: mongoose.Types.ObjectId,
				ref: "User",
				required: true, 
			},
			rating: { type: Number, },
			comment: { type: String, },
			productId: { type: String, },
			orderId: { type: String, },
			createdAt:{ type: Date,  default: Date.now, }
		},
	],
	ratings: { type: Number, default: 0 },
	sold_out: { type: Number, default: 0 },
	event: {
		type: mongoose.Types.ObjectId,
        ref: "Event",
	},
	createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Product", productSchema);