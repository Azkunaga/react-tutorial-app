const STUDENT = /^[A-z][A-z0-9-_]{3,23}$/;
const TEACHER = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const ADMIN = /^[A-Z][a-z]*$/;

const ROLES = {
   STUDENT,
   TEACHER,
   ADMIN
}

export default ROLES;