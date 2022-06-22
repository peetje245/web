import Vue from 'vue'
import Vuex from 'vuex'

import articles from './modules/articles'
import games from './modules/games'
import users from './modules/users'
import roles from './modules/roles'
import platforms from './modules/platforms'
import genres from './modules/genres'
import series from './modules/series'
import publishers from './modules/publishers'
import developers from './modules/developers'
import franchises from './modules/franchises'
import images from './modules/images'

import VuexORM from '@vuex-orm/core'
import User from './models/User'
import Role from './models/Role'
import Article from './models/Article'
import Game from './models/Game'
import Platform from './models/Platform'
import Genre from './models/Genre'
import Serie from './models/Serie'
import Publisher from './models/Publisher'
import Developer from './models/Developer'
import Franchise from './models/Franchise'
import Image from './models/Image'

// import example from './module-example'

Vue.use(Vuex)

// Create a new instance of Database.
const database = new VuexORM.Database()

// Register Models to Database.
database.register(User, users)
database.register(Role, roles)
database.register(Article, articles)
database.register(Game, games)
database.register(Platform, platforms)
database.register(Genre, genres)
database.register(Serie, series)
database.register(Publisher, publishers)
database.register(Developer, developers)
database.register(Franchise, franchises)
database.register(Image, images)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({

    modules: {
        articles,
        games,
        users,
        roles,
        platforms,
        genres,
        series,
        publishers,
        developers,
        franchises
    },

    plugins: [VuexORM.install(database)],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
