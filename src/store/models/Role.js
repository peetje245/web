import { Model } from '@vuex-orm/core'
import User from './User'

export default class Role extends Model {
    static entity = 'roles'

    static primaryKey = 'id'

    static fields () {
        return {
            id: this.number(null),
            title: this.string('')
        }
    }
}