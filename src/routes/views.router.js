import { Router } from 'express'

const router = Router();

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/hello', (req, res) => {

    res.render('hello');
})
export default router;