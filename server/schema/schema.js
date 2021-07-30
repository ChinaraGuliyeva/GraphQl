const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID  } = graphql;

const movies = [
    { id: "1", name: "Harry Potter and the Philosopher's Stone", genre: "fantasy"},
    { id: "2", name: "Harry Potter and the Chamber of Secrets", genre: "fantasy"},
    { id: 3, name: "Harry Potter and the Prisoner of Azkaban", genre: "fantasy"},
    { id: 4, name: "Harry Potter and the Goblet of Fire", genre: "fantasy"}
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    }),
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
        type: MovieType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args){
            return movies.find(movie => movie.id==args.id)
        }
    },
}
});

module.exports = new GraphQLSchema({
    query: Query,
});