const parseHeaderAuthorization = (request: any): string | null => {
  if (request.headers.authorization) {
    if (request.headers.authorization.split(" ")[0] === "X-JWT") {
      return request.headers.authorization.split(" ")[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export default parseHeaderAuthorization;
