import { Model } from '@vuex-orm/core'
import Franchise from './Franchise';

export default class Publisher extends Model {
    static entity = 'publishers'

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