// creating class that handle validation 
class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
  
      this.statusCode = statusCode;
  
    //   this method is used track which line or which file error accur
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default AppError;