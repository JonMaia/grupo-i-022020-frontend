const en = {
  "or"       : "or",
  "notFound" : "Back to Dashboard",
  "coin"     : "US$",
  "SignIn/Up": {
    "email"          : "Email",
    "password"       : "Password",
    "signIn"         : "Sign in",
    "signUp"         : "Sign up",
    "forgotPassword" : "Forgot password?",
    "username"       : "Username",
    "nickname"       : "Nickname",
    "logout"         : "Logout"
  },
  "Validations": {
    "email"    : "Email is not valid",
    "required" : "This field is required"
  },
  "Tables": {
    "openProjects"                   : "Open Projects",
    "projectsCloseToCompletion"      : "Pojects Close To Completion",
    "name"                           : "Name",
    "totalParticipants"              : "Total Participants",
    "amountCollected"                : "Amount Collected",
    "accumulatedPercentageCollected" : "Accumulated Percentage",
    "edit"                           : "Edit",
    "close"                          : "Close",
    "donate"                         : "Donate",
    "rowsPerPage"                    : "Rows per page",
    "previousPage"                   : "Previous page",
    "nextPage"                       : "Next page",
    "info"                           : "Info",
    "province"                       : "Province",
    "population"                     : "Population",
    "state"                          : "State",
    "active"                         : "Active",
    "finished"                       : "Finished",
    "points"                         : "Points"
  },
  "Titles": {
    "home"                           : "Home",
    "createProject"                  : "Create Project",
    "infoProject"                    : "Project Information",
    "projectsNearingCompletion"      : "Projects Nearing Completion",
    "userInfo"                       : "User Info",
    "profile"                        : "Profile"
  },
  "Dialog": {
    "amount"                         : "Amount",
    "comment"                        : "Comment",
    "title"                          : "Do you want to make a donation?",
    "cancel"                         : "Cancel"
  }
}

const es = {
  "or"       : "o",
  "notFound" : "Volver Al Menú Principal",
  "coin"     : "ARS$",
  "SignIn/Up": {
    "email"          : "Correo", 
    "password"       : "Contraseña",
    "signIn"         : "Iniciar sesión",
    "signUp"         : "Registrarse",
    "forgotPassword" : "¿Se te olvidó tu contraseña?",
    "username"       : "Nombre de Usuario",
    "nickname"       : "Apodo",
    "logout"         : "Cerrar Sesión"
  },
  "Validations": {
    "email"    : "El correo no es válido",
    "required" : "Este campo es requerido"
  },
  "Tables": {
    "openProjects"                   : "Proyectos Abiertos",
    "projectsCloseToCompletion"      : "Proyectos Próximos a Finalizar",
    "name"                           : "Nombre",
    "totalParticipants"              : "Total de Participantes",
    "amountCollected"                : "Monto Recaudado",
    "accumulatedPercentageCollected" : "Porcentaje Acumulado",
    "edit"                           : "Editar",
    "close"                          : "Cerrar",
    "donate"                         : "Donar",
    "rowsPerPage"                    : "Filas por página",
    "previousPage"                   : "Página anterior",
    "nextPage"                       : "Siguiente página",
    "info"                           : "Info.",
    "province"                       : "Provincia",
    "population"                     : "Población",
    "state"                          : "Estado",
    "active"                         : "Activo",
    "finished"                       : "Finalizado",
    "points"                         : "Puntos"
  },
  "Titles": {
    "home"                           : "Inicio",
    "createProject"                  : "Crear Proyecto",
    "infoProject"                    : "Información del Proyecto",
    "projectsNearingCompletion"      : "Proyectos Próximos a Finalizar",
    "userInfo"                       : "Información Usuario",
    "profile"                        : "Perfil"
  },
  "Dialog": {
    "amount"                         : "Monto",
    "comment"                        : "Comentario",
    "title"                          : "¿Quieres realizar una donación?",
    "cancel"                         : "Cancelar"
  }
}

function setTranslate() {
  return navigator.language.slice(0, 2) === 'en' ? en : es;
}

const translate = setTranslate();

export default translate;