const validatePageable = (requestData) => {
  const { page, pageSize } = requestData;

  if (page < 0) {
    throw new Error("Page number must be a positive integer!");
  }
  if (pageSize <= 0) {
    throw new Error("Page size must be a positive integer!");
  }
};

export default validatePageable;
