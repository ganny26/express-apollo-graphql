import * as express from 'express'
import * as appController from '../controller/app.controller'

let router = express.Router()
router.post('/add', appController.addUser)
router.post('/fetch', appController.getUser)
router.get('/health', appController.health)

export default router
