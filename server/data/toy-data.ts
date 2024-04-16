export interface ProductModel {
  _id: string;
  name: string;
  subheading: string;
  image: string;
  description: string;
  brand: string;
  tags: string[];
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

const productData = [
  {
    _id: "1",
    name: "Donatello Action Figure",
    subheading: "Teenage Mutant Ninja Turtles",
    image: "/image/tmnt_donny.png",
    description:
      "Classic TMNT action figure from 1987, still unopened in the box. Tbh yes plz retro activated charcoal scenester copper mug you probably haven't heard of them. Hell of selfies everyday carry succulents, gochujang street art snackwave slow-carb ugh.",
    brand: "Playmates",
    tags: ["Action Figure", "Ninja Turtles"],
    price: 59.99,
    countInStock: 1,
    rating: 4.5,
    numReviews: 2,
  },
  {
    _id: "2",
    name: "Pink Ranger Action Figure",
    subheading: "Power Rangers",
    image: "/image/pink_ranger.png",
    description:
      "Mighty Morphin' Pink Ranger action figure. Bodega boys skateboard photo booth, vegan wayfarers retro cray stumptown swag. Jean shorts tumblr pour-over XOXO cliche, blue bottle migas bodega boys blog flannel. Scenester cred normcore forage four loko, asymmetrical irony tilde heirloom seitan prism cliche authentic gastropub activated charcoal.",
    brand: "Super 7",
    tags: ["Action Figure", "Power Rangers"],
    price: 27.99,
    countInStock: 2,
    rating: 3,
    numReviews: 3,
  },
  {
    _id: "3",
    name: "Apocalypse Action Figure",
    subheading: "X-Men",
    image: "/image/xmen_apocalypse.png",
    description:
      "Classic X-Men action figure, still in box. Flannel banh mi JOMO williamsburg gatekeep, keytar church-key meggings live-edge shoreditch. Ramps brunch pickled, distillery gochujang edison bulb umami.",
    brand: "Hasbro",
    tags: ["Action Figure", "X-Men"],
    price: 59.99,
    countInStock: 0,
    rating: 3.5,
    numReviews: 1,
  },
  {
    _id: "4",
    name: "NBA '96-97 Basketball Series 1 Trading Card HOBBY Pack",
    subheading: "Fleer Basketball Trading Cards",
    image: "/image/fleer_b-ball_97.png",
    description:
      "Look for the Franchise Futures and Commemorative 1986-87 Fleer.  Green juice echo park wolf hoodie, gluten-free succulents vegan VHS ramps pabst chambray coloring book flexitarian cliche. Mustache lumbersexual twee yes plz chicharrones unicorn.",
    brand: "Fleer",
    tags: ["Trading Cards", "Basketball"],
    price: 13.99,
    countInStock: 5,
    rating: 3.5,
    numReviews: 3,
  },
  {
    _id: "5",
    name: "Marvel Masterpieces 1992 Base Set",
    subheading: "Marvel Trading Cards",
    image: "/image/marvel_masterpieces.png",
    description:
      "The base set of 100 cards. Lomo gochujang pinterest roof party, PBR&B cupping meggings. Normcore forage tote bag pork belly fam mumblecore. Brunch literally celiac fingerstache direct trade.",
    brand: "Skybox",
    tags: ["Trading Cards", "Marvel"],
    price: 199.99,
    countInStock: 2,
    rating: 5,
    numReviews: 3,
  },
  {
    _id: "6",
    name: "Magic the Gathering: Tenth Edition Blister Pack",
    subheading: "15-Card Booster Pack",
    image: "/image/magic_blister_pack.png",
    description:
      "Pack is sealed and comes as shown. Chartreuse jawn lyft, thundercats tbh vegan food truck street art DIY meh vibecession master cleanse bicycle rights. IPhone portland cloud bread la croix, tacos paleo selfies tote bag lumbersexual polaroid before they sold out.",
    brand: "Wizards of the Coast",
    tags: ["Trading Cards", "Magic the Gathering"],
    price: 54.99,
    countInStock: 2,
    rating: 5,
    numReviews: 3,
  },
];

export default productData;
