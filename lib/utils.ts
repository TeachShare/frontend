export const getAvatarUrl = (
  avatar: string | null | undefined, 
  name?: string, 
  id?: string | number,
  style: 'initials' | 'avataaars' = 'initials'
) => {
  if (avatar && avatar.trim() !== "") {
    return avatar;
  }
  
  // Use a local default avatar if no profile is set
  return "/logos/default-avatar.png";
};

export function unescapeHtml(html: string): string {
  if (!html) return "";
  
  let clean = html.trim();
  
  // Handle double-stringified content (e.g., '"<p>...</p>"' or "\"<p>...</p>\"")
  // We try to parse it if it looks like a JSON string
  if ((clean.startsWith('"') && clean.endsWith('"')) || (clean.startsWith("'") && clean.endsWith("'"))) {
    try {
      // Remove outer single quotes if they exist before JSON parsing
      const jsonCandidate = clean.startsWith("'") && clean.endsWith("'") 
        ? clean.slice(1, -1) 
        : clean;
        
      clean = JSON.parse(jsonCandidate);
    } catch (e) {
      // Fallback manual cleanup
      clean = clean
        .replace(/^['"](.*)['"]$/, '$1')
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
        .replace(/\\n/g, '');
    }
  }

  // Final sanitization for common escape characters
  return clean
    .replace(/\\"/g, '"')
    .replace(/\\n/g, '');
}
