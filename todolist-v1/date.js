module.exports.getDate = () => {
    let today = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long'
    };

    return today.toLocaleDateString("en-GB", options)
}

exports.getDay = function (){
    let today = new Date()
    const options = {
        weekday: 'long'
    };

    return today.toLocaleDateString("en-GB", options)
}

console.log(module.exports)

