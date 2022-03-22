const mongoose = require('mongoose');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;
const dbName = 'bnb';
const colName = 'listings';

const url = `mongodb+srv://${userName}:${password}@${hostname}/${dbName}`;

async function main() {
  await mongoose.connect(url);

  const reviewSchema = new mongoose.Schema({
    name: String,
    comment: String,
    stars: { type: Number, default: 5 },
    submitted: { type: Date, default: Date.now },
  });

  const listingSchema = new mongoose.Schema({
    name: String,
    summary: String,
    propertyType: String,
    bedrooms: Number,
    bathrooms: Number,
    created: { type: Date, default: Date.now },
    state: { type: String, default: 'available' },
    stars: { type: Number, default: 0 },
    reviews: [reviewSchema],
  });

  listingSchema.methods.review = function (review) {
    this.reviews.push(new Review(review));
    const sum = this.reviews.reduce((a, r) => a + r.stars, 0);
    this.stars = sum / this.reviews.length;
    console.log(this.stars, sum, this.reviews.length);
  };

  listingSchema.methods.occupied = function (occupied) {
    this.state = occupied ? 'occupied' : 'available';
  };

  const Listing = mongoose.model('listing', listingSchema);
  const Review = mongoose.model('review', reviewSchema);

  const newListing = new Listing({
    name: 'Mountain View',
    propertyType: 'cabin',
  });

  newListing.review({
    name: "Old miner's cabin",
    comment: 'Smells like a donkey lived there.',
    stars: 1,
  });

  newListing.review({
    name: 'Feels like home',
    comment: 'Built in air conditioning.',
    stars: 4,
  });

  newListing.occupied(true);
  newListing.save();

  const searchResult = await Listing.find({ state: 'occupied' });
  searchResult.forEach((listing) => {
    console.log(listing);
  });
}

main().catch(console.error);
