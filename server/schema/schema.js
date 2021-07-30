const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;

const movies = [
    { id: 1, name: "Harry Potter and the Philosopher's Stone", genre: "fantasy", directorId: "1" },
    { id: 2, name: "Harry Potter and the Chamber of Secrets", genre: "fantasy", directorId: "2" },
    { id: 3, name: "Harry Potter and the Prisoner of Azkaban", genre: "fantasy", directorId: "3" },
    { id: 4, name: "Harry Potter and the Goblet of Fire", genre: "fantasy", directorId: "4" },
    { id: 5, name: "Harry Potter and the Order of the Phoenix", genre: "fantasy", directorId: "5" },
    { id: 6, name: "Harry Potter and the Half-Blood Prince", genre: "fantasy", directorId: "6" },
    { id: 7, name: "Harry Potter and the Deathly Hallows – Part 1", genre: "fantasy", directorId: "7" },
    { id: 8, name: "Harry Potter and the Deathly Hallows – Part 2", genre: "fantasy", directorId: "8" }
]

const directors = [
    { id: "1", name: "Christopher Joseph Columbus", age: 62 },
    { id: "2", name: "Christopher Joseph Columbus", age: 62 },
    { id: "3", name: "Alfonso Cuarón Orozco", age: 59 },
    { id: "4", name: "Michael Cormac Newell", age: 79 },
    { id: "5", name: "David Yates", age: 57 },
    { id: "6", name: "David Yates", age: 57 },
    { id: "7", name: "David Yates", age: 57 },
    { id: "8", name: "David Yates", age: 57 }
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve(parent, args) {
                return directors.find(director => director.id == parent.id)
            }
        }
    }),
})

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
    }),
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return movies.find(movie => movie.id == args.id)
            },
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return directors.find(director => director.id == args.id)
            },
        },
    }
});

module.exports = new GraphQLSchema({
    query: Query,
});