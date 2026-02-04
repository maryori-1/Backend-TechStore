const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: String,
    type: String,
    image: String,
    description: String,
    stock: { type: Number, default: 0 },
    isNew: Boolean,
    isOffer: Boolean,
    originalPrice: Number,
    variants: Array,
    specs: Array
  },
  { timestamps: true }
);

module.exports = mongoose.model("Producto", ProductoSchema);
