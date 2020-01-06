const {
  integerDivision
} = require('./utils');

class PBrute {
  constructor(options = {}) {
    this.options = options;

    this.dictionary = options.dictionary || require('../data/owasp-top-10000');

    const i18n = options.i18n || require('./i18n.json');
    if (options.language) {
      this.i18n = i18n[options.language];
      if (!this.i18n)
        this.i18n = i18n['en-US'];
    } else {
      this.i18n = i18n['en-US'];
    }

    this.calculationTimes = Object.assign({
      // From: https://www.onlinehashcrack.com/tools-benchmark-hashcat-gtx-1080-ti-1070-ti.php
      md5: 55120000n,
      sha1: 16980000n,
      sha256: 7650910n,
      ntlm: 77790000n,
      bcrypt: 2845n,
      // OWASP recommends to tune hashing functions to at least one second
      owasp: 1000n,
      // Google recommends a maximum three second page load time
      online: 3000n
    }, options.calculationTimes || {});
  }

  calculate(password) {
    const characterSet = this.calculateCharacterSet(password);
    const combinations = this.calculateCombinations(password, characterSet);
    const time = this.calculateTimeToHash(combinations);
    const dictionaryIndex = this.dictionaryIndex(password);

    const messages = [];

    let optimistic, pessimistic, likely;
    if (dictionaryIndex !== -1) {
      messages.push({type: 'common', text: `${this.translate('common.head')} ${dictionaryIndex} ${this.translate('common.tail')}`});
      // Best case (slowest cracking)
      optimistic = this.simplifyTime(this.roundTime(this.reduceTime(this.calculationTimes.online * BigInt(dictionaryIndex + 1))));
      // Worst case (fastest cracking)
      pessimistic = this.translate('instant');
      // Likely case (likely most common)
      likely = this.translate('instant');
    } else {
      // Best case (slowest cracking)
      optimistic = this.simplifyTime(this.roundTime(this.reduceTime(time.online / 2n)));
      // Worst case (fastest cracking)
      pessimistic = this.simplifyTime(this.roundTime(this.reduceTime(time.ntlm / 2n)));
      // Likely case (likely most common)
      likely = this.simplifyTime(this.roundTime(this.reduceTime(time.md5 / 2n)));
    }

    if (password.length < 8)
      messages.push({type: 'length', text: this.translate('length.veryShort')});
    else if (password.length < 10)
      messages.push({type: 'length', text: this.translate('length.short')});

    if (characterSet.length === 1 && characterSet[0].name !== 'others') {
      messages.push({type: 'variety', text: `${this.translate('variety')} ${this.translate(`characterSet.${characterSet[0].name}`)}`});
    }

    return {
      combinations,
      time,
      optimistic,
      likely,
      pessimistic,
      messages
    };
  }

  calculateCombinations(password, characterSet = null) {
    characterSet = characterSet || this.calculateCharacterSet(password);
    const characters = characterSet.reduce((sum, x) => sum + x.count, 0);

    return BigInt(characters) ** BigInt(password.length);
  }

  calculateCharacterSet(password) {
    const lowercase = password.match(/[a-z]/);
    const uppercase = password.match(/[A-Z]/);
    const digits = password.match(/[0-9]/);
    // OWASP special characters
    // https://www.owasp.org/index.php/Password_special_characters
    const commonSpecial = password.match(/[ \!"#\$%&'\(\)\*\+,-.\/:;<=>\?@\[\\\]\^_`\{\|\}~]/);
    // Common accented characters
    // https://practicaltypography.com/common-accented-characters.html
    const commonAccented = password.match(/[áÁàÀâÂäÄãÃåÅæÆçÇéÉèÈêÊëËíÍìÌîÎïÏñÑóÓòÒôÔöÖõÕøØœŒßúÚùÙûÛüÜ]/);
    // Anything else
    const others = password.match(/[^A-Za-z0-9 \!"#\$%&'\(\)\*\+,-.\/:;<=>\?@\[\\\]\^_`\{|\}~áÁàÀâÂäÄãÃåÅæÆçÇéÉèÈêÊëËíÍìÌîÎïÏñÑóÓòÒôÔöÖõÕøØœŒßúÚùÙûÛüÜ]/g);

    const characterSet = [];
    if (lowercase)
      characterSet.push({name: 'lowercase', count: 26});
    if (uppercase)
      characterSet.push({name: 'uppercase', count: 26});
    if (digits)
      characterSet.push({name: 'digits', count: 10});
    if (commonSpecial)
      characterSet.push({name: 'commonSpecial', count: 33});
    if (commonAccented)
      characterSet.push({name: 'commonAccented', count: 57});
    if (others)
      characterSet.push({name: 'others', count: others.length});

    return characterSet;
  }

  // Calculates the time necessary to compute the hash in milliseconds (worst-case scenario)
  calculateTimeToHash(combinations) {
    return {
      md5: combinations / this.calculationTimes.md5,
      sha1: combinations / this.calculationTimes.sha1,
      sha256: combinations / this.calculationTimes.sha256,
      bcrypt: combinations / this.calculationTimes.bcrypt,
      ntlm: combinations / this.calculationTimes.ntlm,
      owasp: combinations * this.calculationTimes.owasp,
      online: combinations * this.calculationTimes.online,
    }
  }

  reduceTime(time) {
    const years = integerDivision(time, BigInt(1000 * 60 * 60 * 24 * 365));
    time -= years * BigInt(1000 * 60 * 60 * 24 * 365);

    const months = integerDivision(time, BigInt(1000 * 60 * 60 * 24 * 31));
    time -= months * BigInt(1000 * 60 * 60 * 24 * 31);

    const weeks = integerDivision(time, BigInt(1000 * 60 * 60 * 24 * 7));
    time -= weeks * BigInt(1000 * 60 * 60 * 24 * 7);

    const days = integerDivision(time, BigInt(1000 * 60 * 60 * 24));
    time -= days * BigInt(1000 * 60 * 60 * 24);

    const hours = integerDivision(time, BigInt(1000 * 60 * 60));
    time -= hours * BigInt(1000* 60 * 60);

    const minutes = integerDivision(time, BigInt(1000 * 60));
    time -= minutes * BigInt(1000 * 60);

    const seconds = integerDivision(time, BigInt(1000));
    time -= seconds * BigInt(1000);

    const milliseconds = time;

    return {
      years,
      months,
      weeks,
      days,
      hours,
      minutes,
      seconds,
      milliseconds
    };
  }

  roundTime(reducedTime) {
    // Deep clone
    const roundedTime = {
      years: BigInt(reducedTime.years),
      months: BigInt(reducedTime.months),
      weeks: BigInt(reducedTime.weeks),
      days: BigInt(reducedTime.days),
      hours: BigInt(reducedTime.hours),
      minutes: BigInt(reducedTime.minutes),
      seconds: BigInt(reducedTime.seconds),
      milliseconds: BigInt(reducedTime.milliseconds),
    }

    if (roundedTime.seconds > 0n && roundedTime.milliseconds >= 500n) {
      roundedTime.milliseconds = 0n;
      roundedTime.seconds += 1n;
    }
    if (roundedTime.seconds == 60n) {
      roundedTime.seconds = 0n;
      roundedTime.minutes += 1n;
    }

    if (roundedTime.minutes > 0n && roundedTime.seconds >= 30n) {
      roundedTime.seconds = 0n;
      roundedTime.minutes += 1n;
    }
    if (roundedTime.minutes == 60n) {
      roundedTime.minutes = 0n;
      roundedTime.hours += 1n;
    }

    if (roundedTime.hours > 0n && roundedTime.minutes >= 30n) {
      roundedTime.minutes = 0n;
      roundedTime.hours += 1n;
    }
    if (roundedTime.hours == 24n) {
      roundedTime.hours = 0n;
      roundedTime.days += 1n;
    }

    if (roundedTime.days > 0n && roundedTime.hours >= 12n) {
      roundedTime.hours = 0n;
      roundedTime.days += 1n;
    }
    if (roundedTime.days == 31n) {
      roundedTime.days = 0n;
      roundedTime.months += 1n;
    }

    if (roundedTime.weeks > 0n && roundedTime.days >= 4n) {
      roundedTime.days = 0n;
      roundedTime.weeks += 1n;
    }
    if (roundedTime.weeks == 4n) {
      roundedTime.weeks = 0n;
      roundedTime.months += 1n;
    }

    if (roundedTime.months > 0n && roundedTime.weeks >= 2n) {
      roundedTime.weeks = 0n;
      roundedTime.months += 1n;
    }
    if (roundedTime.months == 12n) {
      roundedTime.months = 0n;
      roundedTime.years += 1n;
    }

    if (roundedTime.years > 0n && roundedTime.months >= 6n) {
      roundedTime.months = 0n;
      roundedTime.years += 1n;
    }

    return roundedTime;
  }

  simplifyTime(roundTime) {
    if (roundTime.years > 0n) {
      if (roundTime.years > 10n ** 33n)
        return `${roundTime.years / (10n ** 33n)} ${this.translate('numbers.decillion')} ${this.translate('years')}`;
      else if (roundTime.years > 10n ** 30n)
        return `${roundTime.years / (10n ** 30n)} ${this.translate('numbers.nonillion')} ${this.translate('years')}`;
      else if (roundTime.years > 10n ** 27n)
        return `${roundTime.years / (10n ** 27n)} ${this.translate('numbers.octillion')} ${this.translate('years')}`;
      else if (roundTime.years > 10n ** 24n)
        return `${roundTime.years / (10n ** 24n)} ${this.translate('numbers.septillion')} ${this.translate('years')}`;
      else if (roundTime.years > 10n ** 21n)
        return `${roundTime.years / (10n ** 21n)} ${this.translate('numbers.sextillion')} ${this.translate('years')}`;
      else if (roundTime.years > 10n ** 18n)
        return `${roundTime.years / (10n ** 18n)} ${this.translate('numbers.quantillion')} ${this.translate('years')}`;
      else if (roundTime.years > 10n ** 15n)
        return `${roundTime.years / (10n ** 15n)} ${this.translate('numbers.quadrillion')} ${this.translate('years')}`;
      else if (roundTime.years > 10n ** 12n)
        return `${roundTime.years / (10n ** 12n)} ${this.translate('numbers.trillion')} ${this.translate('years')}`;
      else if (roundTime.years > 10n ** 9n)
        return `${roundTime.years / (10n ** 9n)} ${this.translate('numbers.billion')} ${this.translate('years')}`;
      else if (roundTime.years > 10n ** 6n)
        return `${roundTime.years / (10n ** 6n)} ${this.translate('numbers.million')} ${this.translate('years')}`;
      else if (roundTime.years > 10n ** 3n)
        return `${roundTime.years / (10n ** 3n)} ${this.translate('numbers.thousand')} ${this.translate('years')}`;
      else if (roundTime.years > 10n ** 2n)
        return `${roundTime.years / (10n ** 2n)} ${this.translate('numbers.hundred')} ${this.translate('years')}`;
      else
        return `${roundTime.years} ${this.translate('years')}`;
    } else if (roundTime.months > 0n) {
      return `${roundTime.months} ${this.translate('months')}`;
    } else if (roundTime.weeks > 0n) {
      return `${roundTime.weeks} ${this.translate('weeks')}`;
    } else if (roundTime.days > 0n) {
      return `${roundTime.days} ${this.translate('days')}`;
    } else if (roundTime.hours > 0n) {
      return `${roundTime.hours} ${this.translate('hours')}`;
    } else if (roundTime.minutes > 0n) {
      return `${roundTime.minutes} ${this.translate('minutes')}`;
    } else if (roundTime.seconds > 0n) {
      return `${roundTime.seconds} ${this.translate('seconds')}`;
    } else if (roundTime.milliseconds > 0n) {
      return `${roundTime.milliseconds} ${this.translate('milliseconds')}`;
    } else {
      return this.translate('instant');
    }
  }

  translate(keys) {
    if (!this.i18n || !keys)
      return '';

    keys = keys.split('.');

    let value = this.i18n;
    for (let key of keys)
      value = value[key];

    return value;
  }

  dictionaryIndex(password) {
    for (let i = 0; i < this.dictionary.length; i++) {
      if (this.dictionary[i] === password)
        return i;
    }

    return -1;
  }
}

module.exports = PBrute;
