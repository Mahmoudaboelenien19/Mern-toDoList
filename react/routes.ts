export const authenticateRoute = "http://localhost:3000/user/authenticate";
export const createToDoRoute = (userId: string) =>
  `http://localhost:3000/user/${userId}/addtodo`;

export const getAllToDosRoute = (userId: string) =>
  `http://localhost:3000/user/${userId}/todos`;
