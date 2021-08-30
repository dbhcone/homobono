import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { ContactUs } from '../controllers/index.controller';
const router = express.Router();

/* GET home page. */
router.get('/test', function (req: Request, res: Response, next: NextFunction) {
  // const statdir = path.join(__dirname, 'dist/fe/index.html');
  // res.sendFile(statdir);
  res
    .status(200)
    .json({
      message: 'Testing endpoint hit successfully',
      status: 'ok',
      code: 200,
    });
});

router.post('/contactus', ContactUs)

export { router as indexRouter };
