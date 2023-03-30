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
    price : {
      type: mongoose.Schema.Types.Decimal128,
      get: value => parseFloat(value.toFixed(2)),
      set: value => parseFloat(value.toFixed(2)),
      required: true
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
