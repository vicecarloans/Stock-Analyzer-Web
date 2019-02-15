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

  const anonymousPaths = ANONYMOUS_ROUTES.findIndex(route =>
    route.includes(path)
  );

  const authorizedPaths = AUTHORIZED_ROUTES.findIndex(route =>
    route.includes(path)
  );

  if (anonymousPaths !== -1) {
    return 1;
  }

  if (authorizedPaths !== -1) {
    return 3;
  }

  return 2;
};
