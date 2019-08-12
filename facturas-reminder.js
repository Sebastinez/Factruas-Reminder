function mailfacturas() {
  
  // Obtiene la fecha del día de hoy y le agrega un día.
  var today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate()+1);
    
  // Obtiene el calendario facturas de la cuenta "sistemas@nuclearis.com".
  var calendar = CalendarApp.getOwnedCalendarById('nuclearis.com_c8pbm8b8u7bllf17p6pscr5dqk@group.calendar.google.com');
  
  // Obtiene los eventos de ese calendario en el día de mañana y el titulo del evento "Alguien trae facturas".
  var events = calendar.getEventsForDay(tomorrow);
  var title = events[0].getTitle();
  
  //Obtiene el nombre del responsable de facturas
  var fullname = title.slice(0,title.search(" trae"));
  
  //Separa el nombre por espacios entre nombres en un array
  var names = fullname.split(" ");
  
  //Crea un array nuevo y mete en un loop for cada primer letra de cada parte de un nombre (sin apellido) en un array nuevo
  var inicial = [];
  for (i = 0; i < names.length-1; i++) { 
    inicial.push(names[i].slice(0,1));
  }
  
  //Agrega al array inicial el apellido completo y lo junta en un string
  inicial.push(names[i]);
  var namemail = inicial.join("");
  
  //Agarra las iniciales y el apellido por ej. smartinez y le agrega el @nuclearis.com
  var mail = namemail.toLowerCase() + '@nuclearis.com';

  //Manda un mail a la variable mail y le agrega asunto y cuerpo
  MailApp.sendEmail({
    to: mail,
    subject: "Facturas del día de mañana",
    htmlBody: "Buen día " + fullname +", te deseamos un muy buen jueves!<br><br>No te olvides las facturas en el día de mañana, que es tu turno este viernes.<br><br>Muchas gracias!!<br><br>Saludos de todos de la oficina!",
  });
}
function createTrigger() {
  //Crea un activador para realizar el mail cada viernes
  ScriptApp.newTrigger('mailfacturas')
      .timeBased()
      .onWeekDay(ScriptApp.WeekDay.THURSDAY)
      .create();
}
