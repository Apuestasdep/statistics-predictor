class BaseService {
  constructor() {
    this.errors = '';
    this.valid = true;
  }

  isValid() {
    return this.valid;
  }

  setAsInvalid() {
    this.valid = false;
  }

  setAsValid() {
    this.valid = true;
  }

  setErrors(error) {
    this.errors = error;
  }
}

module.exports = BaseService;
