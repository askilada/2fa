# 2FA

## Install
    
    yarn add @askilada/2fa
    
or

    npm install --save @askilada/2fa
    
    

## Example

### Typescript

```typescript
import {HOTP, TOTP} from '@askilada/2fa'

const secret = 'SFLW5SMY2FECNYHBRUUMYK5BDY'
const timeSteps = 30

const code = TOTP.generateCode(secret, timeSteps)

console.log(code) // Some 6-digits number

```