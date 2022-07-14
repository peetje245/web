import { Model } from '@vuex-orm/core'

export default class GameGenre extends Model {
    static entity = 'gameGenre'

    static primaryKey = ['game_id', 'genre_id']

    static fields () {
        return {
            game_id: this.number(0),
            genre_id: this.number(0),
        }
    }
}