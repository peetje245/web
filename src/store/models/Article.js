import { Model } from '@vuex-orm/core'
import User from './User'
import Serie from './Serie'

export default class Article extends Model {
    static entity = 'articles'

    static primaryKey = 'id'

    static fields () {
        return {
            id: this.number(null),
            title: this.string(''),
            description: this.string(''),
            author: this.number(null),
            user: this.belongsTo(User, 'author'),
            serie_id: this.number(null),
            serie: this.belongsTo(Serie, 'serie_id'),
            banner: this.string(''),
            active: this.boolean(null).nullable()
        }
    }
}