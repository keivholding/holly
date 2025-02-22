const catchAsync = (inputFn) => {
  return async (req, res, next) => await inputFn(req, res, next).catch(next);
};

export default catchAsync;
