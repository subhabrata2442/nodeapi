function buildCustomResponse(data, options = {}) {
  const {
    statusCode = 200,
    contentType = "application/json",
    headers = {},
  } = options;

  const response = {
    statusCode,
    headers: {
      "Content-Type": contentType,
      ...headers,
    },
    body: data,
  };

  return response;
}

export default function customReturn(req, res, next) {
  const meta = req.headers?.meta ? JSON.parse(req.headers?.meta) : {};

  res.return = function (data, options = {}) {
    const customResponse = buildCustomResponse(data, options);
    res.status(data?.status || customResponse.statusCode);
    res.set(customResponse.headers);
    const body = {
      meta: {
        accesstoken: meta?.accesstoken || "",
        refreshtoken: meta?.refreshtoken || "",
      },
      ...customResponse.body,
    };
    res.send(body);
  };
  next();
}
