import { Model } from '@vuex-orm/core'

export default class Platform extends Model {
    static entity = 'platforms'

    static primaryKey = 'id'

    static fields () {
        return {
            id: this.number(0),
            title: this.string(''),
            release_year: this.number(0),
            active: this.boolean(false),
            checked: this.boolean(true)
        }
    }
}