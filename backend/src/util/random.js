
const getRandom = (list) => {
    try{
        const el = list[Math.floor((Math.random()*list.length))];
        return el;
    }catch(error){
        console.log(error);
    }
}

module.exports = {getRandom};