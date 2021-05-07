function getDomainAndSubdomain(domain: string): { subdomain: string; domain: string } {
  const parts = domain.split('.');

  if (parts.length < 2) {
    throw new Error(`No TLD found on ${domain}`);
  }

  if (parts.length === 2) {
    return { subdomain: '', domain: domain };
  }

  const subdomain = parts[0];
  
  parts.shift();
  
  return {
    subdomain,
    domain: parts.join('.'),
  };
}

export default getDomainAndSubdomain;