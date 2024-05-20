import { Router } from "express";
import { createProperty,getPropertyById,deleteProperty,likeProperty } from "../controllers/property.controller.js";
import {isLoggedIn} from '../middlewares/auth.middleware.js'


const router = Router();

// logend is nessery to perform all task

// url of router 
router
  .route('/') 
  .post(
    isLoggedIn,
    createProperty,
  )
router
  .route('/:id')
  .get(
    isLoggedIn,
    getPropertyById
  )
  .delete(
    isLoggedIn,
    deleteProperty,
  )
  .put(
    isLoggedIn,
    likeProperty
)

export default router;