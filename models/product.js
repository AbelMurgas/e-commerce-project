import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Schema.Types.Decimal128,
      min: 0.0,
      max: 1,
      scale: 2,
      precision: 2,
      required: true,
    },
    discount: {
      type: Schema.Types.Decimal128,
      min: 0.01,
      max: 1,
      scale: 2,
      precision: 2,
    },
    amountInStock: {
      type: Number,
      min: 0,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
