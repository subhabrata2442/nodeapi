const locales = (req, res, next) => {
  req.locale = req.headers["accept-language"] || "en";
  next();
};

export default locales;
