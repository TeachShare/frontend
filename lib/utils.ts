export const getAvatarUrl = (
  avatar: string | null | undefined, 
  name: string, 
  id?: string | number,
  style: 'initials' | 'avataaars' = 'initials'
) => {
  if (avatar && avatar.trim() !== "") {
    return avatar;
  }
  
  const seed = name || id || "default";
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}`;
};
