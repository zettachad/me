import type { PageServerLoad } from './$types';
import { getAllPosts, getPosts } from '$lib/posts';
import { json } from '@sveltejs/kit';

export const GET = (async ({ url }) => {
  const page = url.searchParams.get('page') || '1';
  const all = url.searchParams.get('all') || 'false';
  const after = url.searchParams.get('after') || '';
  const before = url.searchParams.get('before') || '';
  const during = url.searchParams.get('during') || '';
  const tags = url.searchParams.get('tags')?.split(',') || [];
  if (all === 'true') {
    const posts = await getAllPosts();
    return json({ posts: posts });
  }
  const posts = await getPosts(parseInt(page), before, after, during, tags);
  return json({ posts: posts });
}) satisfies PageServerLoad;