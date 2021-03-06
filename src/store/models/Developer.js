import { Model } from '@vuex-orm/core'

export default class Developer extends Model {
    static entity = 'developers'

    static primaryKey = 'id'

    static fields () {
        return {
            id: this.number(0),
            name: this.string(''),
            headquarter: this.string(''),
            established: this.string('')
        }
    }
}