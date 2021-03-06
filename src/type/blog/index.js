/**
 * Created by jack on 16-7-30.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
} from 'graphql';

import PostType from './Post';
import TagType from './Tag';

import { getPostByName, getPostsList, getTagByName, getTagsList } from '../../data';

/**
 * type Blog {
 *   post: Post,	// 查询一篇文章
 *   posts: [Post],	// 查询一组文章，用于博客首页
 *   tag: Tag,		// 查询一个标签
 *   tags: [Tag],	// 查询所有标签，用于博客标签页
 * }
 */
const BlogType = new GraphQLObjectType({
	name: 'BlogType',
	fields: () => ({
		post: {
			type: PostType,
			args: {
				name: {
					type: GraphQLString
				}
			},
			resolve: (blog, { name }) => getPostByName(name),
		},
		posts: {
			type: new GraphQLList(PostType),
			resolve: () => getPostsList(),
		},
		tag: {
			type: TagType,
			args: {
				name: {
					type: GraphQLString
				}
			},
			resolve: (blog, { name }) => getTagByName(name),
		},
		tags: {
			type: new GraphQLList(TagType),
			resolve: () => getTagsList(),
		}
	})
});

export default BlogType;
