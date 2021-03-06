import { Model } from '@vuex-orm/core'

export default class Genre extends Model {
    static entity = 'genres'

    static primaryKey = 'id'

    static fields () {
        return {
            id: this.number(0),
            title: this.string(''),
            checked: this.boolean(true)
        }
    }
}