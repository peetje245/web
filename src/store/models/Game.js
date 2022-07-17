import { Model } from '@vuex-orm/core'
import Serie from './Serie'
import Publisher from './Publisher'
import Developer from './Developer'
import Franchise from './Franchise'
import Genre from './Genre'
import GameGenre from './GameGenre'
import Platform from './Platform'
import GamePlatform from './GamePlatform'
import Image from './Image'
import Video from './Video'

export default class Game extends Model {
    static entity = 'games'

    static primaryKey = 'id'

    static fields () {
        return {
            id: this.number(0),
            title: this.string(''),
            description: this.string(null).nullable(),
            ean: this.number(null).nullable(),
            publisher_id: this.number(0),
            publisher: this.belongsTo(Publisher, 'publisher_id'),
            developer_id: this.number(0),
            developer: this.belongsTo(Developer, 'developer_id'),
            serie_id: this.number(null).nullable(),
            serie: this.belongsTo(Serie, 'serie_id'),
            franchise_id: this.number(null).nullable(),
            franchise: this.belongsTo(Franchise, 'franchise_id'),
            active: this.boolean(false),
            tbd: this.boolean(false),
            tba: this.boolean(false),
            q1: this.boolean(false),
            q2: this.boolean(false),
            q3: this.boolean(false),
            q4: this.boolean(false),
            release_day: this.number(null).nullable(),
            release_month: this.number(null).nullable(),
            month: this.string('').nullable(),
            release_year: this.number(null).nullable(),

            genres: this.belongsToMany(Genre, GameGenre, 'game_id', 'genre_id'),
            platforms: this.belongsToMany(Platform, GamePlatform, 'game_id', 'platform_id'),
            images: this.morphMany(Image, 'imageable_id', 'imageable_type'),
            image: this.morphOne(Image, 'imageable_id', 'imageable_type'),
            videos: this.morphMany(Video, 'videoable_id', 'videoable_type'),
            date: this.string(''),
            show: this.boolean(true),
        }
    }
}