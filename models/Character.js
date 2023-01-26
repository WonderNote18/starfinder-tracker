const mongoose = require("mongoose");
const ObjectId = require("mongoose").Schema.Types.ObjectId;
const Mixed = require("mongoose").Schema.Types.Mixed;
const User = require('./User');
const Campaign = require('./Campaign');

const CharacterSchema = mongoose.Schema({
  chAuthor: {
    type: ObjectId,
    ref: 'User',
    required: [true, 'A User ID is required to connect your Character to the Author'],
  },
  chBio: {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please enter a name for your Character'],
      maxLength: [64, 'Character Name cannot be longer than 64 characters'],
    },
    race: {
      type: Number,
      required: [true, 'Please select a race for your Character'],
    },
    gender: {
      type: Number,
      required: [true, 'Please select a gender for your Character'],
    },
    age: {
      type: Number,
      default: null,
      max: [9999, 'Age cannot be greater than 9999'],
    },
    hair: {
      type: String,
      default: null,
      maxLength: [128, 'Hair description cannot be longer than 128 characters'],
    },
    eyes: {
      type: String,
      default: null,
      maxLength: [128, 'Eyes description cannot be longer than 128 characters'],
    },
    skin: {
      type: String,
      default: null,
      maxLength: [128, 'Skin description cannot be longer than 128 characters'],
    },
    height: {
      type: Number,
      default: null,
      max: [2400, 'Height cannot be taller than 200ft'],
    },
    weight: {
      type: Number,
      default: null,
      max: [40000, 'Weight cannot be taller than 20 tons (40,000 lbs)'],
    },
  },
  chBackground: {
    theme: {
      type: Number,
      default: null,
    },
    alignment: {
      type: Number,
      default: null,
    },
    faith: {
      type: String,
      default: null,
    },
    personality: {
      type: String,
      default: null,
      maxLength: [2048, 'Personality can be no loger than 2048 characters'],
    },
    likes: {
      type: String,
      default: null,
      maxLength: [2048, 'Likes can be no loger than 2048 characters'],
    },
    dislikes: {
      type: String,
      default: null,
      maxLength: [2048, 'Disikes can be no loger than 2048 characters'],
    },
    allies: {
      type: Array,
    },
    enemies: {
      type: Array,
    },
    organizations: {
      type: Array,
    },
    backstory: {
      type: String,
      default: null,
    },
  },
  chStats: {
    abilities: {
      str: {
        key: {
          type: Boolean,
          default: false,
        },
        baseScore: {
          type: Number,
          required: [true, 'A Strength Score must be entered in'],
          max: [28, 'Max ability score is 28'],
        },
        baseMod: {
          type: Number,
          default: 0,
        },
      },
      dex: {
        key: {
          type: Boolean,
          default: false,
        },
        baseScore: {
          type: Number,
          required: [true, 'A Dexterity Score must be entered in'],
          max: [28, 'Max ability score is 28'],
        },
        baseMod: {
          type: Number,
          default: 0,
        },
      },
      con: {
        key: {
          type: Boolean,
          default: false,
        },
        baseScore: {
          type: Number,
          required: [true, 'A Constitution Score must be entered in'],
          max: [28, 'Max ability score is 28'],
        },
        baseMod: {
          type: Number,
          default: 0,
        },
      },
      int: {
        key: {
          type: Boolean,
          default: false,
        },
        baseScore: {
          type: Number,
          required: [true, 'A Intelligence Score must be entered in'],
          max: [28, 'Max ability score is 28'],
        },
        baseMod: {
          type: Number,
          default: 0,
        },
      },
      wis: {
        key: {
          type: Boolean,
          default: false,
        },
        baseScore: {
          type: Number,
          required: [true, 'A Wisdom Score must be entered in'],
          max: [28, 'Max ability score is 28'],
        },
        baseMod: {
          type: Number,
          default: 0,
        },
      },
      cha: {
        key: {
          type: Boolean,
          default: false,
        },
        baseScore: {
          type: Number,
          required: [true, 'A Charisma Score must be entered in'],
          max: [28, 'Max ability score is 28'],
        },
        baseMod: {
          type: Number,
          default: 0,
        },
      },
    },
    skills: {
      acrobatics: {
        classSkill: {
          type: Boolean,
          default: false,
        },
        totalScore: {
          type: Number,
          required: [true, 'A total Acrobatics Score must be entered in'],
          min: [0, 'Minimum score is 0'],
        },
        skillRanksMod: {
          type: Number,
          default: 0,
        },
        classBonusMod: {
          type: Number,
          default: 0,
        },
        abilityMod: {
          type: Number,
          default: 0,
        },
        featMod: {
          type: Number,
          default: 0,
        },
        itemMod: {
          type: Number,
          default: 0,
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      athletics: {
        classSkill: {
          type: Boolean,
          default: false,
        },
        totalScore: {
          type: Number,
          required: [true, 'A total Athletics Score must be entered in'],
          min: [0, 'Minimum score is 0'],
        },
        skillRanksMod: {
          type: Number,
          default: 0,
        },
        classBonusMod: {
          type: Number,
          default: 0,
        },
        abilityMod: {
          type: Number,
          default: 0,
        },
        featMod: {
          type: Number,
          default: 0,
        },
        itemMod: {
          type: Number,
          default: 0,
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      bluff: {
        classSkill: {
          type: Boolean,
          default: false,
        },
        totalScore: {
          type: Number,
          required: [true, 'A total Bluff Score must be entered in'],
          min: [0, 'Minimum score is 0'],
        },
        skillRanksMod: {
          type: Number,
          default: 0,
        },
        classBonusMod: {
          type: Number,
          default: 0,
        },
        abilityMod: {
          type: Number,
          default: 0,
        },
        featMod: {
          type: Number,
          default: 0,
        },
        itemMod: {
          type: Number,
          default: 0,
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      computers: {
        classSkill: {
          type: Boolean,
          default: false,
        },
        isTrained: {
          type: Boolean,
          default: true,
        },
        totalScore: {
          type: Number,
          default: 0,
          min: [0, 'Minimum score is 0'],
        },
        skillRanksMod: {
          type: Number,
          default: 0,
        },
        classBonusMod: {
          type: Number,
          default: 0,
        },
        abilityMod: {
          type: Number,
          default: 0,
        },
        featMod: {
          type: Number,
          default: 0,
        },
        itemMod: {
          type: Number,
          default: 0,
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      culture: {
        classSkill: {
          type: Boolean,
          default: false,
        },
        isTrained: {
          type: Boolean,
          default: true,
        },
        totalScore: {
          type: Number,
          default: 0,
          min: [0, 'Minimum score is 0'],
        },
        skillRanksMod: {
          type: Number,
          default: 0,
        },
        classBonusMod: {
          type: Number,
          default: 0,
        },
        abilityMod: {
          type: Number,
          default: 0,
        },
        featMod: {
          type: Number,
          default: 0,
        },
        itemMod: {
          type: Number,
          default: 0,
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      diplomacy: {
        classSkill: {
          type: Boolean,
          default: false,
        },
        isTrained: {
          type: Boolean,
          default: false,
        },
        totalScore: {
          type: Number,
          default: 0,
          min: [0, 'Minimum score is 0'],
        },
        skillRanksMod: {
          type: Number,
          default: 0,
        },
        classBonusMod: {
          type: Number,
          default: 0,
        },
        abilityMod: {
          type: Number,
          default: 0,
        },
        featMod: {
          type: Number,
          default: 0,
        },
        itemMod: {
          type: Number,
          default: 0,
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      disguise: {
        classSkill: {
          type: Boolean,
          default: false,
        },
        totalScore: {
          type: Number,
          required: [true, 'A total Disguise Score must be entered in'],
          min: [0, 'Minimum score is 0'],
        },
        skillRanksMod: {
          type: Number,
          default: 0,
        },
        classBonusMod: {
          type: Number,
          default: 0,
        },
        abilityMod: {
          type: Number,
          default: 0,
        },
        featMod: {
          type: Number,
          default: 0,
        },
        itemMod: {
          type: Number,
          default: 0,
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      engineering: {
        classSkill: {
          type: Boolean,
          default: false,
        },
        isTrained: {
          type: Boolean,
          default: false,
        },
        totalScore: {
          type: Number,
          default: 0,
          min: [0, 'Minimum score is 0'],
        },
        skillRanksMod: {
          type: Number,
          default: 0,
        },
        classBonusMod: {
          type: Number,
          default: 0,
        },
        abilityMod: {
          type: Number,
          default: 0,
        },
        featMod: {
          type: Number,
          default: 0,
        },
        itemMod: {
          type: Number,
          default: 0,
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      intimidate: {
        classSkill: {
          type: Boolean,
          default: false,
        },
        totalScore: {
          type: Number,
          required: [true, 'A total Intimidation Score must be entered in'],
          min: [0, 'Minimum score is 0'],
        },
        skillRanksMod: {
          type: Number,
          default: 0,
        },
        classBonusMod: {
          type: Number,
          default: 0,
        },
        abilityMod: {
          type: Number,
          default: 0,
        },
        featMod: {
          type: Number,
          default: 0,
        },
        itemMod: {
          type: Number,
          default: 0,
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      lifeScience: {
        classSkill: {
          type: Boolean,
          default: false,
        },
        isTrained: {
          type: Boolean,
          default: false,
        },
        totalScore: {
          type: Number,
          default: 0,
          min: [0, 'Minimum score is 0'],
        },
        skillRanksMod: {
          type: Number,
          default: 0,
        },
        classBonusMod: {
          type: Number,
          default: 0,
        },
        abilityMod: {
          type: Number,
          default: 0,
        },
        featMod: {
          type: Number,
          default: 0,
        },
        itemMod: {
          type: Number,
          default: 0,
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      medicine: {
        classSkill: {
          type: Boolean,
          default: false,
        },
        isTrained: {
          type: Boolean,
          default: false,
        },
        totalScore: {
          type: Number,
          default: 0,
          min: [0, 'Minimum score is 0'],
        },
        skillRanksMod: {
          type: Number,
          default: 0,
        },
        classBonusMod: {
          type: Number,
          default: 0,
        },
        abilityMod: {
          type: Number,
          default: 0,
        },
        featMod: {
          type: Number,
          default: 0,
        },
        itemMod: {
          type: Number,
          default: 0,
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      mysticism: {
        classSkill: {
          type: Boolean,
          default: false,
        },
        isTrained: {
          type: Boolean,
          default: false,
        },
        totalScore: {
          type: Number,
          default: 0,
          min: [0, 'Minimum score is 0'],
        },
        skillRanksMod: {
          type: Number,
          default: 0,
        },
        classBonusMod: {
          type: Number,
          default: 0,
        },
        abilityMod: {
          type: Number,
          default: 0,
        },
        featMod: {
          type: Number,
          default: 0,
        },
        itemMod: {
          type: Number,
          default: 0,
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      perception: {
        classSkill: {
          type: Boolean,
          default: false,
        },
        totalScore: {
          type: Number,
          required: [true, 'A total Perception Score must be entered in'],
          min: [0, 'Minimum score is 0'],
        },
        skillRanksMod: {
          type: Number,
          default: 0,
        },
        classBonusMod: {
          type: Number,
          default: 0,
        },
        abilityMod: {
          type: Number,
          default: 0,
        },
        featMod: {
          type: Number,
          default: 0,
        },
        itemMod: {
          type: Number,
          default: 0,
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      physicalScience: {
        classSkill: {
          type: Boolean,
          default: false,
        },
        isTrained: {
          type: Boolean,
          default: false,
        },
        totalScore: {
          type: Number,
          default: 0,
          min: [0, 'Minimum score is 0'],
        },
        skillRanksMod: {
          type: Number,
          default: 0,
        },
        classBonusMod: {
          type: Number,
          default: 0,
        },
        abilityMod: {
          type: Number,
          default: 0,
        },
        featMod: {
          type: Number,
          default: 0,
        },
        itemMod: {
          type: Number,
          default: 0,
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      piloting: {
        classSkill: {
          type: Boolean,
          default: false,
        },
        totalScore: {
          type: Number,
          required: [true, 'A total Piloting Score must be entered in'],
          min: [0, 'Minimum score is 0'],
        },
        skillRanksMod: {
          type: Number,
          default: 0,
        },
        classBonusMod: {
          type: Number,
          default: 0,
        },
        abilityMod: {
          type: Number,
          default: 0,
        },
        featMod: {
          type: Number,
          default: 0,
        },
        itemMod: {
          type: Number,
          default: 0,
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      senseMotive: {
        classSkill: {
          type: Boolean,
          default: false,
        },
        totalScore: {
          type: Number,
          required: [true, 'A total Sense Motive Score must be entered in'],
          min: [0, 'Minimum score is 0'],
        },
        skillRanksMod: {
          type: Number,
          default: 0,
        },
        classBonusMod: {
          type: Number,
          default: 0,
        },
        abilityMod: {
          type: Number,
          default: 0,
        },
        featMod: {
          type: Number,
          default: 0,
        },
        itemMod: {
          type: Number,
          default: 0,
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      sleightOfHand: {
        classSkill: {
          type: Boolean,
          default: false,
        },
        isTrained: {
          type: Boolean,
          default: false,
        },
        totalScore: {
          type: Number,
          default: 0,
          min: [0, 'Minimum score is 0'],
        },
        skillRanksMod: {
          type: Number,
          default: 0,
        },
        classBonusMod: {
          type: Number,
          default: 0,
        },
        abilityMod: {
          type: Number,
          default: 0,
        },
        featMod: {
          type: Number,
          default: 0,
        },
        itemMod: {
          type: Number,
          default: 0,
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      stealth: {
        classSkill: {
          type: Boolean,
          default: false,
        },
        totalScore: {
          type: Number,
          required: [true, 'A total Stealth Score must be entered in'],
          min: [0, 'Minimum score is 0'],
        },
        skillRanksMod: {
          type: Number,
          default: 0,
        },
        classBonusMod: {
          type: Number,
          default: 0,
        },
        abilityMod: {
          type: Number,
          default: 0,
        },
        featMod: {
          type: Number,
          default: 0,
        },
        itemMod: {
          type: Number,
          default: 0,
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      survival: {
        classSkill: {
          type: Boolean,
          default: false,
        },
        totalScore: {
          type: Number,
          required: [true, 'A total Survival Score must be entered in'],
          min: [0, 'Minimum score is 0'],
        },
        skillRanksMod: {
          type: Number,
          default: 0,
        },
        classBonusMod: {
          type: Number,
          default: 0,
        },
        abilityMod: {
          type: Number,
          default: 0,
        },
        featMod: {
          type: Number,
          default: 0,
        },
        itemMod: {
          type: Number,
          default: 0,
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      professions: {
        type: Array,
      },

    },
    combat: {
      hitPoints: {
        totalPoints: {
          type: Number,
          required: [true, "Charater's total Hit Points must be entered"],
          min: [1, "Character's total Hit Points must be greater than 1"]
        },
        currentPoints: {
          type: Number,
          min: 0,
        },
        tempPoints: {
          type: Number,
          min: 0,
        },
      },
      staminaPoints: {
        totalPoints: {
          type: Number,
          required: [true, "Charater's total Stamina Points must be entered"],
          min: [1, "Character's total Stamina Points must be greater than 1"]
        },
        currentPoints: {
          type: Number,
          min: 0,
        },
        tempPoints: {
          type: Number,
          min: 0,
        },
      },
      resolvePoints: {
        totalPoints: {
          type: Number,
          required: [true, "Charater's total Resolve Points must be entered"],
          min: [1, "Character's total Resolve Points must be greater than 1"]
        },
        currentPoints: {
          type: Number,
          min: 0,
        },
        tempPoints: {
          type: Number,
          min: 0,
        },
      },
      baseAttackBonus: {
        totalBonus: {
          type: Number,
          required: [true, "Character's Base Attack Bonus must be entered in"],
        },
        classBonusMod: {
          type: Number,
          default: 0,
        },
      },
      meleeAttackBonus: {
        totalBonus: {
          type: Number,
          required: [true, "Character's Melee Attack Bonus must be entered in"],
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      rangedAttackBonus: {
        totalBonus: {
          type: Number,
          required: [true, "Character's Ranged Attack Bonus must be entered in"],
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      thrownAttackBonus: {
        totalBonus: {
          type: Number,
          required: [true, "Character's Thrown Attack Bonus must be entered in"],
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      initiative: {
        totalInit: {
          type: Number,
          required: [true, "Character's Initiative must be entered in"],
        },
        featMod: {
          type: Number,
          default: 0,
        },
        classMod: {
          type: Number,
          default: 0,
        },
        miscMod: {
          type: Number,
          default: 0,
        },
      },
      speed: {
        landSpeed: {
          type: Number,
          required: [true, "Character's land speed must be entered in"],
          min: [0, 'Minimum land speed must be 0'],
        },
        flySpeed: {
          type: Number,
          default: 0,
          min: [0, 'Minimum fly speed must be 0'],
        },
        swimSpeed: {
          type: Number,
          default: 0,
          min: [0, 'Minimum swim speed must be 0'],
        },
        climbSpeed: {
          type: Number,
          default: 0,
          min: [0, 'Minimum climbing speed must be 0'],
        },
        miscSpeed: {
          type: Number,
          default: 0,
          min: [0, 'Minimum misc speed must be 0'],
        },
      },
      energyAC: {
        totalAC: {
          type: Number,
          required: [true, "Character's Energy AC must be entered in"],
          min: [1, 'Minimum Energy AC speed must be 1'],
        },
        armorModAC: {
          type: Number,
          default: 0,
        },
        dexModAC: {
          type: Number,
          default: 0,
        },
        miscModAC: {
          type: Number,
          default: 0,
        },
      },
      kineticAC: {
        totalAC: {
          type: Number,
          required: [true, "Character's Kinetic AC must be entered in"],
          min: [1, 'Minimum Kinetic AC speed must be 1'],
        },
        armorModAC: {
          type: Number,
          default: 0,
        },
        dexModAC: {
          type: Number,
          default: 0,
        },
        miscModAC: {
          type: Number,
          default: 0,
        },
      },
      combatManeuverAC: {
        totalAC: {
          type: Number,
          required: [true, "Character's Combat Maneuver AC must be entered in"],
          min: [1, 'Minimum Energy AC speed must be 1'],
        },
      },
      damageReduction: {
        totalDR: {
          type: Number,
          default: 0,
        },
      },
      energyResistance: {
        totalER: {
          type: Number,
          default: 0,
        },
      },
    },
    savingThrows: {
      fortitude: {
        totalST: {
          type: Number,
          required: [true, "Character's Fortitude Saving Throw must be entered in"],
        },
        classModST: {
          type: Number,
          default: 0,
        },
        abilityModST: {
          type: Number,
          default: 0,
        },
        featModST: {
          type: Number,
          default: 0,
        },
        resistanceModST: {
          type: Number,
          default: 0,
        },
        miscModST: {
          type: Number,
          default: 0,
        },
      },
      reflex: {
        totalST: {
          type: Number,
          required: [true, "Character's Reflex Saving Throw must be entered in"],
        },
        classModST: {
          type: Number,
          default: 0,
        },
        abilityModST: {
          type: Number,
          default: 0,
        },
        featModST: {
          type: Number,
          default: 0,
        },
        resistanceModST: {
          type: Number,
          default: 0,
        },
        miscModST: {
          type: Number,
          default: 0,
        },
      },
      will: {
        totalST: {
          type: Number,
          required: [true, "Character's Will Saving Throw must be entered in"],
        },
        classModST: {
          type: Number,
          default: 0,
        },
        abilityModST: {
          type: Number,
          default: 0,
        },
        featModST: {
          type: Number,
          default: 0,
        },
        resistanceModST: {
          type: Number,
          default: 0,
        },
        miscModST: {
          type: Number,
          default: 0,
        },
      },
    },
  },
/*
      Class Layout
      class: {
        TODO
      }
*/
  chClasses: {
    type: Mixed,
  },
/*
      Feat Layout
      feat: {
        TODO
      }
*/
  chFeats: {
    type: Mixed,
  },
  chSpells:{
    spellLimits: {
      1: {
        totalSlots: {
          type: Number,
          default: 0,
        },
        currentSlots: {
          type: Number,
          default: 0,
        },
      },
      2: {
        totalSlots: {
          type: Number,
          default: 0,
        },
        currentSlots: {
          type: Number,
          default: 0,
        },
      },
      3: {
        totalSlots: {
          type: Number,
          default: 0,
        },
        currentSlots: {
          type: Number,
          default: 0,
        },
      },
      4: {
        totalSlots: {
          type: Number,
          default: 0,
        },
        currentSlots: {
          type: Number,
          default: 0,
        },
      },
      5: {
        totalSlots: {
          type: Number,
          default: 0,
        },
        currentSlots: {
          type: Number,
          default: 0,
        },
      },
      6: {
        totalSlots: {
          type: Number,
          default: 0,
        },
        currentSlots: {
          type: Number,
          default: 0,
        },
      },
    },
/*
      Spell Layout
      spell: {
        name,
        level,
        castTime,
        range,
        duration,
        area, (optional)
        targets, (optional)
        savingThrow, (optional)
        hasSpellResistance, (optional)
        reference
      }
*/
    knownSpells: {
      type: Mixed,
    },
  },
  chInventory: {
    credits: {
      type: Number,
      default: 0,
    },
/*
    Item Layout
    item: {
      name,
      description,
      type,
      level,
      price,
      bulk,
      isEquipable,
      isWeapon,
      isArmor,
      proficiency, (weapon/armor)
      capacityCharges, (weapon/armor)
      capacityUsage, (weapon/armor)
      bonusEAC, (armor)
      bonusKAC, (armor)
      maxDexBonus, (armor)
      penaltyAC, (armor)
      penaltySpeed, (armor)
      handsRequired, (weapon)
      attackDamage, (weapon, string '{1}{d6}{Piercing or Acid}')
      attackRange, (weapon),
      weaponSpecial, (weapon)
      reference
    }
*/
    equipment: {
      type: Mixed,
    }
  }
}, {timestamps: true});

// export model Character with CampaignSchema
const Character = mongoose.model("Character", CharacterSchema);
module.exports = Character;