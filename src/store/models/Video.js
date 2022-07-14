import { Model } from '@vuex-orm/core'

export default class Video extends Model {
    static entity = 'videos'

    static primaryKey = 'id'

    static fields () {
        return {
            id: this.number(0),
            name: this.string(''),
            link: this.string(''),
            videoable_id: this.attr(null),
            videoable_type: this.attr(null),
            videoable: this.morphTo('videoable_id', 'videoable_type')
        }
    }
}