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

    // Fetch user data to get public contributions
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App'
        },
        next: { revalidate: 3600 }
      }
    );

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user data');
    }

    // Fetch contribution data from GitHub's SVG endpoint
    const currentYear = new Date().getFullYear();
    const contributionsResponse = await fetch(
      `https://github.com/users/${username}/contributions?from=${currentYear - 1}-12-01&to=${currentYear}-12-31`,
      {
        headers: {
          'User-Agent': 'Portfolio-App'
        },
        next: { revalidate: 86400 } // Cache for 24 hours
      }
    );

    let commitsLastYear = 0;

    if (contributionsResponse.ok) {
      const html = await contributionsResponse.text();
      
      // Extract contribution counts from the SVG
      const matches = html.match(/data-count="(\d+)"/g);
      
      if (matches) {
        commitsLastYear = matches.reduce((sum, match) => {
          const count = parseInt(match.match(/\d+/)?.[0] || '0');
          return sum + count;
        }, 0);
      }
    }

    // If scraping fails, try to get a rough estimate from recent activity
    if (commitsLastYear === 0) {
      const eventsResponse = await fetch(
        `https://api.github.com/users/${username}/events/public?per_page=100`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Portfolio-App'
          },
          next: { revalidate: 3600 }
        }
      );

      if (eventsResponse.ok) {
        const events = await eventsResponse.json();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        commitsLastYear = events.filter((event: any) => {
          if (event.type === 'PushEvent') {
            const eventDate = new Date(event.created_at);
            return eventDate >= oneYearAgo;
          }
          return false;
        }).reduce((sum: number, event: any) => sum + (event.payload?.commits?.length || 0), 0);
      }
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
