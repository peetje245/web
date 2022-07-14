import { Model } from '@vuex-orm/core'

export default class GamePlatform extends Model {
    static entity = 'gamePlatform'

    static primaryKey = ['game_id', 'platform_id']

    static fields () {
        return {
            game_id: this.number(0),
            platform_id: this.number(0),
        }
    }
}