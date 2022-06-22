import { Model } from '@vuex-orm/core'

export default class Platform extends Model {
    static entity = 'platforms'

    static primaryKey = 'id'

    static fields () {
        return {
            id: this.number(null),
            title: this.string(''),
            release_year: this.string(''),
            active: this.boolean()
        }
    }
}