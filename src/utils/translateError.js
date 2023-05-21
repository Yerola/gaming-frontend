export function translateError(message){

    if(message === "Invalid identifier or password")
     return "El identificador o la contraseña que ingresó son incorrectos";
     if(message === "Email or Username are already taken")
     return "El correo electrónico o el nombre de usuario ya están en uso";

}