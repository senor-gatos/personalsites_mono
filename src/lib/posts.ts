export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
}

export async function getPosts(): Promise<Post[]> {
  const modules = import.meta.glob('./posts/*.md', { eager: true }) as Record<
    string,
    { metadata: Omit<Post, 'slug'> }
  >;

  const posts = Object.entries(modules).map(([path, mod]) => {
    const slug = path.replace('./posts/', '').replace('.md', '');
    return { slug, ...mod.metadata } as Post;
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
