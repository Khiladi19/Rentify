import Property from "../model/property.model.js";
import AppError from "../utils/appError.js";

// create propety deatails
export const createProperty = async (req, res,next) => {
  const {title,description,bedrooms,bathrom,prices,location} = req.body;
  
  if (!title || !description || !bedrooms || !bathrom|| !prices|| !location) {
    return next(new AppError('All fields are required', 400));
  }

    // crate property details
  const property = await Property.create({
    title,
    description,
    bedrooms,
    bathrom,
    prices,
    location,
    postedBy: req.user._id
  });

  if(!property){
    return next(
      new AppError('Property registration failed, please try again later', 400)
    );
  }

  await property.save();

  res.status(201).json({
    success: true,
    message: 'Property registered successfully',
    property,
});

};

// Get a single property by id
export const getPropertyById = async (req, res,next) => {
  const _id = req.params.id;

  try {
    const property = await Property.findById(_id);

    if (!property) {
      return next(
        new AppError('Property did not fectch, please try again later', 400)
      );
    }

    res.status(201).json({
      success: true,
      message: 'Propety Id Sucessfuly fetch',
      property,
  });
  } catch (error) {
    return next(
      new AppError(
        JSON.stringify(error) || 'something went wrong propery properly',
        400
      )
    );
  }
};

// Delete a property
export const deleteProperty = async (req, res,next) => {
  try {
    const property = await Property.findOneAndDelete({ _id: req.params.id, postedBy: req.user._id });

    if (!property) {
      return next(
        new AppError('Property did not fectch, please try again later', 400)
      );
    }

    res.status(201).json({
      success: true,
      message: 'Delete propety sucessfully ',
      property,
  });


  } catch (error) {
    return next(
      new AppError(
        JSON.stringify(error) || 'Not delete propery properly',
        400
      )
    );
  }
};

// Increment likes for a property
export const likeProperty = async (req, res,next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return next(
        new AppError('Property did not fectch, please try again later', 400)
      );
    }

    await property.incrementLikes();
    res.status(201).json({
      success: true,
      message: 'Most liked Propery',
      property,
  });
  

  } catch (error) {
    return next(
      new AppError(
        JSON.stringify(error),
        400
      )
    );
  }
};

