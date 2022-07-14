import { Model } from '@vuex-orm/core'

export default class Serie extends Model {
    static entity = 'series'

    static primaryKey = 'id'

    static fields () {
        return {
            id: this.number(0),
            name: this.string(''),
            first_game_release: this.number(null).nullable(),
            checked: this.boolean(true)
        }
    }
}