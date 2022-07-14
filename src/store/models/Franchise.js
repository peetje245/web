import { Model } from '@vuex-orm/core'
import Publisher from './Publisher'

export default class Franchise extends Model {
    static entity = 'franchises'

    static primaryKey = 'id'

    static fields () {
        return {
            id: this.number(0),
            title: this.string(''),
            publisher_id: this.number(0),
            publisher: this.belongsTo(Publisher, 'publisher_id'),
            release_year: this.number(0),
            checked: this.boolean(true)
        }
    }
}