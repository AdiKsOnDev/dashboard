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

    let commitsLastYear = 0;

    // Try scraping the GitHub profile page for contribution count
    try {
      const profileResponse = await fetch(
        `https://github.com/${username}`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
          },
          next: { revalidate: 86400 }
        }
      );

      if (profileResponse.ok) {
        const html = await profileResponse.text();
        
        // Multiple patterns to try
        const patterns = [
          /(\d{1,3}(?:,\d{3})*)\s+contributions?\s+in\s+the\s+last\s+year/i,
          /(\d{1,3}(?:,\d{3})*)\s+contributions?\s+in\s+\d{4}/i,
          /<h2[^>]*>(\d{1,3}(?:,\d{3})*)<\/h2>\s*contributions?\s+in\s+the\s+last\s+year/i
        ];
        
        for (const pattern of patterns) {
          const match = html.match(pattern);
          if (match && match[1]) {
            commitsLastYear = parseInt(match[1].replace(/,/g, ''));
            break;
          }
        }

        // If still 0, try to find it in the SVG data
        if (commitsLastYear === 0) {
          const dataCountMatches = html.match(/data-count="(\d+)"/g);
          if (dataCountMatches) {
            commitsLastYear = dataCountMatches.reduce((sum, match) => {
              const count = parseInt(match.match(/\d+/)?.[0] || '0');
              return sum + count;
            }, 0);
          }
        }
      }
    } catch (scrapeError) {
      console.error('Scraping failed:', scrapeError);
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
