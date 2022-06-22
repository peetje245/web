import { Model } from '@vuex-orm/core'
import Serie from './Serie'
import Publisher from './Publisher'
import Developer from './Developer'
import Image from './Image'

export default class Game extends Model {
    static entity = 'games'

    static primaryKey = 'id'

    static fields () {
        return {
            id: this.number(null),
            title: this.string(''),
            ean: this.string('').nullable(),
            publisher_id: this.number(null),
            publisher: this.belongsTo(Publisher, 'publisher_id'),
            developer_id: this.number(null),
            developer: this.belongsTo(Developer, 'developer_id'),
            serie_id: this.number(null).nullable(),
            serie: this.belongsTo(Serie, 'serie_id'),
            image_id: this.number(null).nullable(),
            image: this.belongsTo(Image, 'image_id'),
            banner: this.string('').nullable(),
            tbd: this.boolean(false),
            tba: this.boolean(false),
            q1: this.boolean(false),
            q2: this.boolean(false),
            q3: this.boolean(false),
            q4: this.boolean(false),
            release_day: this.number(null).nullable(),
            release_month: this.string('').nullable(),
            month: this.string('').nullable(),
            release_year: this.number().nullable(),
            date: this.string(''),
        }
    }
}