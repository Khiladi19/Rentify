
import {Schema,model} from "mongoose";
// Define the Property schema
const propertySchema = new Schema({
  title: {
    type: String,
    required: [true,'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true,'Description is required'],
    trim: true
  },
  area: {
    type: Number,
    required: [true,'Area is required'],
  },
  bedrooms: {
    type: Number,
    required: [true,'Bedrooms is required'],
  },
  bathrooms: {
    type: Number,
    required: [true,'Bathrooms is required'],
  },
  price: {
    type: Number,
    required: [true,'Price is required'],
  },
  location: {
    type: String,
    required: [true,'Title is required'],
    trim: true
  },


  amenities: {
    hospitals: {
      type: Number,
      default: 0
    },
    colleges: {
      type: Number,
      default: 0
    },
    parks: {
      type: Number,
      default: 0
    },
    malls: {
      type: Number,
      default: 0
    }
  },
  likes: {
    type: Number,
    default: 0
  },
//   postedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: false,
//     ref: 'User'
//   }

}, {
  timestamps: true
});

// Method to increment likes

// propertySchema.methods.incrementLikes = async function () {
//   const property = this;
//   property.likes += 1;
//   await property.save();
// };



const Property = model('Property',propertySchema);
export default  Property;