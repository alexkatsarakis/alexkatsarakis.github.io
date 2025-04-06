class Assert {
  _assertionState = true;

  check(state, errMessage = "Error on Assertion") {
    if (this._assertionState === true && !state)
      // === true to avoid conversions
      throw Error(errMessage);
  }
}

const assert = new Assert();

export default assert;
