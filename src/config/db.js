const mongoose = require('mongoose');

module.exports = () => {
    try {
        return mongoose.connect("mongodb+srv://vaibhav:lenovovks@cluster0.jsrmj.mongodb.net/mernProj?retryWrites=true&w=majority")
    } catch (e) {
        console.log(e.message);
    }
}


