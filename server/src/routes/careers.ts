import express, { RequestHandler } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

import {
  career_list,
  career_info,
  add_career,
  update_career,
  delete_career
} from '../controllers/careerController';

import checkAdmin from '../middleware/checkAdmin';

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req: Request, file: Express.Multer.File) => {
    if (file.fieldname === 'bio_photo') {
      return {
        folder: 'IMAGES/envs/bio_photos'
      };
    } else if (file.fieldname === 'job_photo') {
      return {
        folder: 'IMAGES/envs/job_photos'
      };
    }
  }
});

// Set up Multer middleware
const upload = multer({ storage: storage });

///// CAREER ROUTES /////

// Returns list of careers on GET
router.get('/', career_list);

// Returns info for a single career on GET
router.get('/:id', career_info);

// Adds a new career on POST
router.post(
  '/',
  upload.fields([
    { name: 'bio_photo', maxCount: 1 },
    { name: 'job_photo', maxCount: 1 }
  ]),
  checkAdmin,
  add_career
);

// Updates a career on PUT
router.put(
  '/',
  upload.fields([
    { name: 'bio_photo', maxCount: 1 },
    { name: 'job_photo', maxCount: 1 }
  ]),
  checkAdmin,
  update_career
);

// Removes a career on DELETE
router.delete('/:id', checkAdmin, delete_career);

export default router;
