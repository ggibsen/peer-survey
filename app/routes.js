var userSchema = new mongoose.Schema({
         active: Boolean,
         email: { type: String, trim: true, lowercase: true },
         firstName: { type: String, trim: true },
         lastName: { type: String, trim: true },
         sp_api_key_id: { type: String, trim: true },
         sp_api_key_secret: { type: String, trim: true },
         subs: { type: [mongoose.Schema.Types.ObjectId], default: [] },
         created: { type: Date, default: Date.now },
         lastLogin: { type: Date, default: Date.now },
     },
     { collection: 'user' }
);

userSchema.index({email : 1}, {unique:true});
userSchema.index({sp_api_key_id : 1}, {unique:true});

var UserModel = mongoose.model( 'User', userSchema );


var feedSchema = new mongoose.Schema({
         feedURL: { type: String, trim:true },
         link: { type: String, trim:true },
         description: { type: String, trim:true },
         state: { type: String, trim:true, lowercase:true, default: 'new' },
         createdDate: { type: Date, default: Date.now },
         modifiedDate: { type: Date, default: Date.now },
     },
     { collection: 'feed' }
);
 
feedSchema.index({feedURL : 1}, {unique:true});
feedSchema.index({link : 1}, {unique:true, sparse:true});
 
var FeedModel = mongoose.model( 'Feed', feedSchema );

