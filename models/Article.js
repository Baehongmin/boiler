const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    title:{
        type: String,
        maxlength: 50,
        required: true
    },
    contents:{
        type: String,
        maxlength: 500,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    writer: {
        type: String,
        maxlength: 50
    },
    likeCount:{
        type: Number,
        default: 0
    },
    unLikeCount: {
        type: Number,
        default: 0
    }

})

articleSchema.pre('save', function(next) {
    if(this.likecount || this.unLikeCount) {
        let err = new Error("likecount, unLikecount is not Possible");
        next(err);
    }else {
        next();
    }
})

const Article=mongoose.model('Article', articleSchema)

module.exports = { Article }