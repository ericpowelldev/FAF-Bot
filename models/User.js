//////////////////////////////  DEPENDENCIES  //////////////////////////////
const mongoose = require("mongoose");

//////////////////////////////  MODEL  //////////////////////////////
const User = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    lvl: {
        type: Number,
        default: 1,
        required: true,
    },
    xp: {
        type: Number,
        default: 0,
        required: true,
    },
    gold: {
        type: Number,
        default: 100,
        required: true,
    },
    info: {
        type: Object,
        default: {
            birthday: null
        },
        required: true,
    },
    stat: {
        type: Object,
        default: {
            HP: 10,
            maxHP: 10,
            EP: 10,
            maxEP: 10,
            AP: 1,
            maxAP: 1,
        },
        required: true,
    },
    items: {
        type: Array,
        default: [
            {
                category: `offense`,
                type: `sword`,
                ref: `0000`,
                name: `Iron Sword`,
                material: `iron`,
                cost: 25,
                hit: 5,
                damLow: 5,
                damHigh: 10,
                critMult: 2,
            },
            {
                category: `defense`,
                type: `medium`,
                ref: `1000`,
                name: `Iron Armor`,
                material: `iron`,
                cost: 25,
                mob: 5,
                armLow: 5,
                armHigh: 10,
            },
        ],
        required: true,
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("User", User);