import { Model } from '@vuex-orm/core'

export default class Image extends Model {
    static entity = 'images'

    static primaryKey = 'id'

    static fields () {
        return {
            id: this.number(0),
            name: this.string(''),
            imageable_id: this.attr(null),
            imageable_type: this.attr(null),
        }
    }
}