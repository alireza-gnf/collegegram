/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - bearerAuth: []

 * users/{userId}/followings:
 *   get:
 *     summary: Get a list of users that the specified user is following
 *     description: Retrieves the list of users that the specified user is following.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose followings are to be retrieved.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of followed users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     following:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: User ID of the followed user
 *                           avatar:
 *                             type: string
 *                             nullable: true
 *                             description: URL of the followed user's avatar
 *                           username:
 *                             type: string
 *                             description: Username of the followed user
 *                           first_name:
 *                             type: string
 *                             description: First name of the followed user
 *                           last_name:
 *                             type: string
 *                             description: Last name of the followed user
 *                           bio:
 *                             type: string
 *                             nullable: true
 *                             description: Bio of the followed user
 *                           followersCount:
 *                             type: integer
 *                             description: Number of followers the followed user has
 *       400:
 *         description: Bad request, possibly due to invalid user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */