class CustomError extends Error {
    constructor(message,code) {
      super(message); // (1)
      this.code = code; // (2)
    }
  }
  module.exports=CustomError