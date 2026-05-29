import { getPosts } from '$lib/posts';
import { projects } from '$lib/data/projects';
import { hobbies, queue } from '$lib/data/hobbies';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const posts = await getPosts();
  return { posts, projects, hobbies, queue };
};
