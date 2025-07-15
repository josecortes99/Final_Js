//Importamos las rutas 
import { eventsView } from './admin_events.js';
import { addView } from './admin_add.js';
import { curseViewEvents } from './user_events.js';
import { inscViewUser } from './user_insc.js';

//Exportamos los #
export const routes = {
  "#/eventsAdmin": eventsView,
  "#/addAdmin": addView,
  "#/eventsUser": curseViewEvents,
  "#/inscUser": inscViewUser,
};
