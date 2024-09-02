import express from 'express';

import userSignUp from '../controller/article.js';

const AuthRouter = express.Router();

AuthRouter.post('/generate-article', userSignUp.generateArticle);

export default AuthRouter;
