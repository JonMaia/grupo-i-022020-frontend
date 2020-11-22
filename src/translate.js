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
    "logout"         : "Logout",
    "isAdmin"        : "Login as administrator"
  },
  "Validations": {
    "email"      : "Email is not valid",
    "required"   : "This field is required",
    "minLength4" : "(Min length 4)"
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
    "points"                         : "Points",
    "amount"                         : "Amount",
    "date"                           : "Date",
    "projectName"                    : "Project Name"
  },
  "Titles": {
    "home"                           : "Home",
    "createProject"                  : "Create Project",
    "infoProject"                    : "Project Information",
    "projectsNearingCompletion"      : "Projects Nearing Completion",
    "userInfo"                       : "User Info",
    "donationsInfo"                  : "Donations Info",
    "profile"                        : "Profile",
    "projectName"                    : "Solidarity Solidario Argentina Connected",
    "closeProject"                   : "Close Project",
    "endDate"                        : "End Date",
    "minPercentage"                  : "Min Percentage",
    "factor"                         : "Factor",
    "locations"                      : "Locations"
  },
  "Dialog": {
    "amount"                         : "Amount",
    "comment"                        : "Comment",
    "title"                          : "Do you want to make a donation?",
    "cancel"                         : "Cancel",
    "accept"                         : "Accept",
    "reallyClose"                    : "Are you sure you want to close the project?"
  },
  "Error": {
    "incorrectData"                  : "Incorrect Data",
    "Incorrect mail or password"     : "Incorrect email or password"
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
    "logout"         : "Cerrar Sesión",
    "isAdmin"        : "Iniciar como administrado"
  },
  "Validations": {
    "email"      : "El correo no es válido",
    "required"   : "Este campo es requerido",
    "minLength4" : "(Mínimo 4 caracteres)"
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
    "points"                         : "Puntos",
    "amount"                         : "Monto",
    "date"                           : "Fecha",
    "projectName"                    : "Nombre del Proyecto"
  },
  "Titles": {
    "home"                           : "Inicio",
    "createProject"                  : "Crear Proyecto",
    "infoProject"                    : "Información del Proyecto",
    "projectsNearingCompletion"      : "Proyectos Próximos a Finalizar",
    "userInfo"                       : "Información Usuario",
    "donationsInfo"                  : "Información de Donaciones",
    "profile"                        : "Perfil",
    "projectName"                    : "Crowdfunding Solidario Argentina Conectada",
    "closeProject"                   : "Cerrar Proyecto",
    "endDate"                        : "Fecha de Cierre",
    "minPercentage"                  : "Porcentaje Mínimo",
    "factor"                         : "Factor",
    "locations"                      : "Localidades"
  },
  "Dialog": {
    "amount"                         : "Monto",
    "comment"                        : "Comentario",
    "title"                          : "¿Quieres realizar una donación?",
    "cancel"                         : "Cancelar",
    "accept"                         : "Aceptar",
    "reallyClose"                    : "¿Seguro quieres cerrar el proyecto?"
  },
  "Error": {
    "incorrectData"                  : "Datos Incorrectos",
    "Incorrect mail or password"     : "Email o contraseña incorrectos"
  }
}

function setTranslate() {
  return navigator.language.slice(0, 2) === 'en' ? en : es;
}

const translate = setTranslate();

export default translate;