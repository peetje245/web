import { Model } from '@vuex-orm/core'

export default class Image extends Model {
    static entity = 'images'

    static primaryKey = 'id'

    static fields () {
        return {
            id: this.number(null),
            name: this.string(''),
        }
    }
}