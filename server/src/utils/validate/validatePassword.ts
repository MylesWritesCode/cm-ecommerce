export const validatePassword = (password: String) => {
  if (password.length < 5) {
    return {
      field: "password",
      message: "Your password is too short."
    }
  }

  // No errors found
  return null;
}