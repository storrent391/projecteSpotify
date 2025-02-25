const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);
  
    const statusCode = err.statusCode || 500;
    const message = err.message || "Error intern del servidor";
  
    res.status(statusCode).json({
      message,
      error: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  };
  
  module.exports = errorHandler;
  