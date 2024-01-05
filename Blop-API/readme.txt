This is a Blog-API

Two types of user:
1.Admin
2.User

#Admin:

Admins are allowed to sign-up,sign-in, get all the users, delete a user

#User:

USers are allowed to sign-up,sign-in, get all the blogs posted by them, delete a blog, update a Blog

#routes-Admin
1.POST /admin/signup
Description-Creates a new admin
input body: {username, password}
Output: { message: 'Admin created successfully' }

2.POST /admin/signin
Description: Logs in an admin account.
Input Body: { username: 'admin', password: 'pass' }
Output: { token: 'your-token' }

3. GET /admin/users
Description: Gets all the users
Input Body: { 'Authorization': 'Bearer <your-token>' }
Output: { users: users }

4.DELETE /admin/:userId
Description: Deletes a particular user
Input Body: { 'Authorization': 'Bearer <your-token>'}
Output: {message: "User successfully deleted" }

#routes-User
#routes-Admin
1.POST /user/signup
Description-Creates a new admin
input body: {username, password}
Output: { message: 'Admin created successfully' }

2.POST /user/signin
Description: Logs in an admin account.
Input Body: { username, password }
Output: { token: 'your-token' }

3. GET /user/blogs
Description: Gets all the blogs
Input Body: { 'Authorization': 'Bearer <your-token>' }
Output: { blogs: blogs }

4.DELETE /user/:blogId
Description: Deletes a particular blog
Input Body: { 'Authorization': 'Bearer <your-token>'}
Output: {message: "Blog deleted" }

4.PUT /user/:blogId
Description: Updates a particular blog
Input Body: { 'Authorization': 'Bearer <your-token>'}
Output: {message: "Blog udated" }

