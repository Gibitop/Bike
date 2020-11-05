import passwordValidator from 'password-validator'

const validator = new passwordValidator()
    .is().min(8)
    .is().max(64)
    // Only visible ASCII characters without spaces
    .has().not(/[^\x21-\x7F]+/)
    .is().not().oneOf([
        // Blacklist of passwords
    ])

export default validator
