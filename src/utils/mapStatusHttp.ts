const mapStatushttps = (status: string) : number => {
  const statusMap : Record<string, number> = {
    SUCCESSFUL: 200,
    INVALID_DATA: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    CREATED: 201,
  };

  return statusMap[status] ?? 500;
};

export default mapStatushttps;