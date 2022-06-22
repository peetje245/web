import menuItem from "./menuItem";
import user from './user';
import role from './role';
import required from "./required";
import article from "./article";
import genre from "./genre";
import publisher from "./publisher";
import developer from "./developer";
import platform from "./platform";
import franchise from './franchise';
import serie from "./serie";
import game from "./game";
import filter from "./filter";

export default {
    menuItem: {
        ...menuItem
    },
    user: {
        ...user
    },
    role: {
        ...role
    },
    required: {
        ...required
    },
    article: {
        ...article
    },
    genre: {
        ...genre
    },
    publisher: {
        ...publisher
    },
    developer:{
        ...developer
    },
    platform: {
        ...platform
    },
    franchise: {
        ...franchise
    },
    serie: {
        ...serie,
    },
    game: {
        ...game
    },
    filter: {
        ...filter
    },
    add: 'Toevoegen',
    save: 'Opslaan',
    cancel: 'Annuleren',
    update: 'Wijzigen',
    delete: 'Verwijderen'
}
