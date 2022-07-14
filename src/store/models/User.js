// User Model

import { Model } from '@vuex-orm/core'
import Role from './Role'
import Image from './Image'

export default class User extends Model {
    static entity = 'users'

    static primaryKey = 'id'

    static fields () {
        return {
            id: this.number(0),
            name: this.string(''),
            username: this.string(null).nullable(),
            description: this.string(null).nullable(),
            email: this.string(''),
            role_id: this.number(0),
            role: this.belongsTo(Role, 'role_id'),
            image_id: this.number(null).nullable(),
            image: this.belongsTo(Image, 'image_id'),
            banned: this.boolean(false),
            created_at: this.string('')
        }
    }
}