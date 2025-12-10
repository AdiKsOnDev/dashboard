import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    // Fetch user's repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App'
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!reposResponse.ok) {
      throw new Error('Failed to fetch repositories');
    }

    const repos = await reposResponse.json();

    // Calculate total stars
    const totalStars = repos.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0);

    // Fetch contributions using github-contributions-api
    // Source: https://stackoverflow.com/a/78203136
    // Posted by AvivKeller
    // Retrieved 2025-12-10, License: CC BY-SA 4.0
    let commitsLastYear = 0;
    
    try {
      const contributionsResponse = await fetch(
        `https://github-contributions-api.deno.dev/${username}.json`,
        {
          headers: {
            'User-Agent': 'Portfolio-App'
          },
          next: { revalidate: 86400 } // Cache for 24 hours
        }
      );

      if (contributionsResponse.ok) {
        const contributionsData = await contributionsResponse.json();
        commitsLastYear = contributionsData.totalContributions || 0;
      }
    } catch (contributionsError) {
      console.error('Error fetching contributions:', contributionsError);
      // If the contributions API fails, set to 0
      commitsLastYear = 0;
    }

    return NextResponse.json({
      totalStars,
      commitsLastYear
    });

  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats', totalStars: 0, commitsLastYear: 0 },
      { status: 500 }
    );
  }
}
