const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login.controller')

/**
 * @swagger
 *  tags: 
 *      name: Login
 *      description: User authentication
 */

/**
 * @swagger
 * /login:
 *  post:
 *      summary: Returns the user login information
 *      tags: [Login]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                      example:
 *                          email: mariaf@gmail.com
 *                          password: contraseña123
 *      responses:
 *          201: 
 *              description: Successful login
 *          400:
 *              description: Incomplete data
 */
router.post('/', loginController.login)


module.exports = router;