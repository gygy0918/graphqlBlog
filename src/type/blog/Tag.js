/**
 * Created by jack on 16-7-30.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLNonNull,
	GraphQLList,
} from 'graphql';

import PostType from './Post';

import { getPostsList } from '../../data';

/**
 * type Tag {
 *   id: ID!,
 *   name: String!,
 *   label: String!,
 *   createDate: String!,
 *   posts: [Post]
 * }
 */
const Tag = new GraphQLObjectType({
	name: 'TagType',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		name: {
			type: new GraphQLNonNull(GraphQLString)
		},
		label: {
			type: new GraphQLNonNull(GraphQLString)
		},
		createDate: {
			type: new GraphQLNonNull(GraphQLString)
		},
		posts: {
			type: new GraphQLList(PostType),
			resolve: tag => getPostsList().filter(post => ~post.tags.indexOf(tag.name))
		}
	})
});

export default Tag;
