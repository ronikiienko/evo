import {Rang} from "./Rang";

const firstNames: string[] = [
    'Sky',
    'Star',
    'Moon',
    'Sun',
    'Galaxy',
    'Nebula',
    'Aurora',
    'Comet',
    'Cosmic',
    'Celestial',
    'Nova',
    'Stellar',
    'Orion',
    'Lunar',
    'Solar',
    'Meteor',
    'Interstellar',
    'Eclipse',
    'Supernova',
    'Infinity',
    'Astro',
    'Spectral',
    'Pulsar',
    'Zodiac',
    'Pluto',
    'Venus',
    'Mars',
    'Neptune',
    'Saturn',
    'Jupiter',
    'Uranus',
    'Mercury',
    'Asteroid',
    'Titan',
    'Phantom',
    'Galactic',
    'Zenith',
    'Thermal',
    'Helios',
    'Apollo',
    'Lunaris',
    'Astral',
    'Nebulous',
    'Exoplanet',
    'Quasar',
    'Cosmonaut',
    'Bubble',
    'Brian',
    'Ydolf',
    'Baldo'
];
const lastNames: string[] = [
    'Explorer',
    'Seeker',
    'Pioneer',
    'Voyager',
    'Navigator',
    'Traveler',
    'Adventurer',
    'Wayfarer',
    'Scout',
    'Surveyor',
    'Pathfinder',
    'Pathmaker',
    'Quester',
    'Discoverer',
    'Wanderer',
    'Roamer',
    'Rover',
    'Nomad',
    'Pilgrim',
    'Prospector',
    'Trailblazer',
    'Vagabond',
    'Expeditioner',
    'Strider',
    'Ranger',
    'Wanderlust',
    'Roamer',
    'Wayfinder',
    'Tourist',
    'Journeyer',
    'Globetrotter',
    'Roamer',
    'Vagrant',
    'Sojourner',
    'Odysseus',
    'Drifter',
    'Roamer',
    'Hitchhiker',
    'Gypsy',
    'Nomad',
    'Roamer',
    'Frontiersman',
    'Roamer',
    'Roamer',
    'Roamer',
    'Roamer',
    'Roamer'
];
export class Rand {
    static getId(length: number = 6, dictionary: string = '0123456789') {
        const idArray = [];
        const dictLength = dictionary.length;

        for (let i = 0; i < length; i++) {
            const randomIndex = this.inRange(new Rang(0, dictLength - 1));
            idArray.push(dictionary[randomIndex]);
        }

        return idArray.join('');
    }

    static getName() {
        const firstName = firstNames[Rand.inRange(new Rang(0, firstNames.length - 1), 0)]
        const lastName = lastNames[Rand.inRange(new Rang(0, lastNames.length - 1), 0)]
        return firstName + ' ' + lastName
    }

    static inRange(range: Rang, decimals: number = 0) {
        const precision = Math.pow(10, decimals);
        return Math.floor(Math.random() * (range.end * precision - range.start * precision + 1) + range.start * precision) / precision;
    }

    static sign() {
        return Math.random() < 0.5 ? 1 : -1;
    }

    static bool() {
        return Math.random() < 0.5;
    }
}
