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
        default: 0,
        required: true,
    },
    xp: {
        type: Number,
        default: 0,
        required: true,
    },
    gold: {
        type: Number,
        default: 0,
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
                type: `dagger`,
                ref: `0000`,
                name: `Iron Dagger`,
                material: `iron`,
                damLow: 1,
                damHigh: 3,
                critMult: 2,
            },
        ],
        required: true,
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model("User", User);