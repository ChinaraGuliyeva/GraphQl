const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const movies = [
    { id: 1, name: "Harry Potter and the Philosopher's Stone", genre: "fantasy", directorId: "1" },
    { id: 2, name: "Harry Potter and the Chamber of Secrets", genre: "fantasy", directorId: "1" },
    { id: 3, name: "Harry Potter and the Prisoner of Azkaban", genre: "fantasy", directorId: "2" },
    { id: 4, name: "Harry Potter and the Goblet of Fire", genre: "fantasy", directorId: "3" },
    { id: 5, name: "Harry Potter and the Order of the Phoenix", genre: "fantasy", directorId: "4" },
    { id: 6, name: "Harry Potter and the Half-Blood Prince", genre: "fantasy", directorId: "4" },
    { id: 7, name: "Harry Potter and the Deathly Hallows – Part 1", genre: "fantasy", directorId: "4" },
    { id: 8, name: "Harry Potter and the Deathly Hallows – Part 2", genre: "fantasy", directorId: "4" }
]

const directors = [
    { id: "1", name: "Christopher Joseph Columbus", age: 62 },
    { id: "2", name: "Alfonso Cuarón Orozco", age: 59 },
    { id: "3", name: "Michael Cormac Newell", age: 79 },
    { id: "4", name: "David Yates", age: 57 },
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
                return directors.find(director => director.id == parent.directorId)
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
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return movies.filter(movie => movie.directorId==parent.id)
            }
        }
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
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return movies;
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args){
                return directors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
});