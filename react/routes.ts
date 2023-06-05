export const authenticateRoute = "/api/user/authenticate";

export const createToDoRoute = (userId: string) =>
  `/api/user/${userId}/addtodo`;

export const getAllToDosRoute = (userId: string) => `/api/user/${userId}/todos`;

export const deleteToDoRoute = (todoId: string) => `/api/todo/${todoId}`;

export const updateToDoRoute = (todoId: string) => `/api/todo/${todoId}`;

export const ClearALlToDosRoute = (userId: string) =>
  `/api/user/${userId}/cleartodos`;

export const getUserRoute = (userId: string) => `/api/user/${userId}`;

export const updateUserRoute = (userId: string) => `/api/user/update/${userId}`;

export const updateUserImageRoute = (userId: string) =>
  `/api/user/updateimage/${userId}`;

export const addNotificationRoute = (userId: string) =>
  `/api/user/${userId}/addnotification`;

export const resetNotificationRoute = (userId: string) =>
  `/api/user/notifications/${userId}`;

export const markALlNotificationsRoute = (userId: string) =>
  `/api/user/markallnotifications/${userId}`;

export const deleteNotificationRoute = (
  userId: string,
  notificationId: string
) => `/api/user/${userId}/${notificationId}`;

export const getNewTokenRoute = `/api/user/auth/refresh`;

export const logOutRoute = `/api/user/logout`;
