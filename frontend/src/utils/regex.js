const USER_REG = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NAME_REG = /^[A-Z][a-z]*$/;
const EMAIL_REG = /^[A-z0-9-_][A-z0-9-_]*@[a-z][a-z]*\.[a-z]{2,3}$/;

const regex = {
    USER_REG,
    PWD_REG,
    NAME_REG,
    EMAIL_REG
}

export default regex;