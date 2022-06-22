import { Model } from '@vuex-orm/core'
import Publisher from './Publisher'
import Developer from './Developer'
import Franchise from './Franchise'

export default class Serie extends Model {
    static entity = 'series'

    static primaryKey = 'id'

    static fields () {
        return {
            id: this.number(null),
            name: this.string(''),
            publisher_id: this.number(null),
            publisher: this.belongsTo(Publisher, 'publisher_id'),
            developer_id: this.number(null),
            developer: this.belongsTo(Developer, 'developer_id'),
            franchise_id: this.number(null),
            franchise: this.belongsTo(Franchise, 'franchise_id'),
            first_game_release: this.string('')
        }
    }
}