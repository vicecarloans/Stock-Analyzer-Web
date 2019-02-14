import { ANONYMOUS_ROUTES, AUTHORIZED_ROUTES } from "constants/path";

export const pathType = path => {
  /**
   * path: any string of path
   * return : Number
   * 1 for anonymous
   * 2 for neutral
   * 3 for authorized
   * 404 path will be neutral
   */

  const anonymousPaths = ANONYMOUS_ROUTES.test(path);

  const authorizedPaths = AUTHORIZED_ROUTES.test(path);

  if (anonymousPaths) {
    return 1;
  }
  if (authorizedPaths) {
    return 3;
  }

  return 2;
};
