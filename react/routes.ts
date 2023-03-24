export const authenticateRoute = "http://localhost:3000/user/authenticate";

export const createToDoRoute = (userId: string) =>
  `http://localhost:3000/user/${userId}/addtodo`;

export const getAllToDosRoute = (userId: string) =>
  `http://localhost:3000/user/${userId}/todos`;

export const deleteToDoRoute = (todoId: string) =>
  `http://localhost:3000/todo/${todoId}`;

export const updateToDoRoute = (todoId: string) =>
  `http://localhost:3000/todo/${todoId}`;

export const ClearALlToDosRoute = (userId: string) =>
  `http://localhost:3000/user/${userId}/cleartodos`;

export const getUserRoute = (userId: string) =>
  `http://localhost:3000/user/${userId}`;

export const updateUserRoute = (userId: string) =>
  `http://localhost:3000/user/update/${userId}`;

export const addNotificationRoute = (userId: string) =>
  `http://localhost:3000/user/${userId}/addnotification`;

export const deleteNotificationRoute = (
  userId: string,
  notificationId: string
) => `http://localhost:3000/user/${userId}/${notificationId}`;

export const getNewTokenRoute = `http://localhost:3000/user/auth/refresh`;

export const logOutRoute = `http://localhost:3000/user/logout`;
