# PBrute
### A feature-rich and modern password strength calculator
***
![npm badge](https://img.shields.io/npm/v/pbrute.svg)

### Setting up

##### Installing - Node

```
npm install pbrute
```

##### Quickstart

```JavaScript
const PBrute = require('pbrute');

const pbrute = new PBrute();
```

```JavaScript
pbrute.calculate('password');

{
  combinations: 208827064576n,
  time: {
    md5: 3788n,
    sha1: 12298n,
    sha256: 27294n,
    bcrypt: 73401428n,
    ntlm: 2684n,
    owasp: 208827064576000n,
    online: 626481193728000n
  },
  optimistic: '3 seconds',
  likely: 'instant',
  pessimistic: 'instant',
  messages: [
    {
      type: 'common',
      text: 'Common password: The top 0 most common password'
    },
    {
      type: 'variety',
      text: 'Character variety: Just lowercase letters'
    }
  ]
}
```

```JavaScript
pbrute.calculate('password');

{
  combinations: 208827064576n,
  time: {
    md5: 3788n,
    sha1: 12298n,
    sha256: 27294n,
    bcrypt: 73401428n,
    ntlm: 2684n,
    owasp: 208827064576000n,
    online: 626481193728000n
  },
  optimistic: '3 seconds',
  likely: 'instant',
  pessimistic: 'instant',
  messages: [
    {
      type: 'common',
      text: 'Common password: The top 0 most common password'
    },
    {
      type: 'variety',
      text: 'Character variety: Just lowercase letters'
    }
  ]
}
```

```JavaScript
pbrute.calculate('cr4CKThi$PasswordIfYouDare');

{
  combinations: 2635200944657423647039506726457895338535308837890625n,
  time: {
    md5: 47808435135294333219149251205694763035836517n,
    sha1: 155194401923287611721996862571136356804199578n,
    sha256: 344429740339047727268979340556599847408387869n,
    bcrypt: 926256922550939770488403067296272526725943352509n,
    ntlm: 33875831657763512624238420445531499402690690n,
    owasp: 2635200944657423647039506726457895338535308837890625000n,
    online: 7905602833972270941118520179373686015605926513671875000n
  },
  optimistic: '125342510685 decillion years',
  likely: '757 nonillion years',
  pessimistic: '537 nonillion years',
  messages: []
}
```

##### Installing - Browser

_Note: If you have a build step in your application, you can use the instructions above._

Copy one of the distribution files. The `bare` builds only contain what's necessary to compute everything. No translation is available and messages etc. will be broken. The `translations-only` build contains both the core and all of the translations, for user-friendly messages in various langauges. Lastly, the `full` build contains everyting - core, translations and a password dictionary.

```HTML
<script src="./full.min.js"></script>
```

##### Running demo

Simply run `npm start` and navigate to `http://localhost:3000`. This is the same site that is hosted over at `https://pbrute.axgn.se`.

### Documentation

The documentation is currently a bit sparse. For more information, refer to the source, tests and issues.

#### Support

The library uses `BigInt` which is a new addition to JavaScript. It is not supported by all browsers. You can follow the up-to-date support here: https://caniuse.com/#feat=bigint.

#### Configuration

```JavaScript
const pbrute = new PBrute({
  // Use Swedish for simplications and messages
  language: 'sv-SE',
  // A custom dictionary for translations (see lib/i18n.json)
  i18n: customDictionary,
  // A sorted list of top passwords
  dictionary: ['password', '123456', 'qwerty'],
  calculationTimes: {
    // Custom time for MD5 calculations
    md5: 551200000000n
  }
});
```

### Contributing

Any contribution is welcome. If you're not able to code it yourself, perhaps someone else is - so post an issue if there's anything on your mind.

###### Development

```
# Clone the repository
git clone https://github.com/AlexGustafsson/pbrute

# Enter the directory
cd pbrute

# Install dependencies
npm install

# Follow the conventions enforced
npm run lint
npm run stylelint
npm run test
npm run coverage
npm run check-duplicate-code
npm run build
npm run integration

# Build for production
npm run build
```

### Disclaimer

_Although the project is very capable, it is not built with production in mind. Therefore there might be complications when trying to use the API for large-scale projects meant for the public. The library was created to easily calculate password strength and as such it might not promote best practices nor be performant._
