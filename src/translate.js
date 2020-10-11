const en = {
  "or": "or",
  "SignIn/Up": {
    "email"          : "Email",
    "password"       : "Password",
    "signIn"         : "Sign in",
    "signUp"         : "Sign up",
    "forgotPassword" : "Forgot password?",
    "username"       : "Username",
    "google"         : "Login with Google"
  },
  "Validations": {
    "email"    : "Email is not valid",
    "required" : "This field is required"
  }
}

const es = {
  "or": "o",
  "SignIn/Up": {
    "email"          : "Correo", 
    "password"       : "Contraseña",
    "signIn"         : "Iniciar sesión",
    "signUp"         : "Registrarse",
    "forgotPassword" : "¿Se te olvidó tu contraseña?",
    "username"       : "Nombre de Usuario",
    "google"         : "Iniciar sesión con Google"
  },
  "Validations": {
    "email"    : "El correo no es válido",
    "required" : "Este campo es requerido"
  }
}

function setTranslate() {
  return navigator.language.slice(0, 2) == 'en' ? en : es;
}

const translate = setTranslate();

export default translate;