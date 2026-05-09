import React from "react";

export const GoogleAuthButton = () => {
  const handleGoogleLogin = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
    window.location.href = `${apiUrl}/auth/login/google`;
  };
  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="w-full bg-white dark:bg-[#21262d] border border-zinc-200 dark:border-[#30363d] hover:bg-zinc-50 dark:hover:bg-[#30363d] text-zinc-700 dark:text-[#c9d1d9] font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 text-sm shadow-sm dark:shadow-none"
    >
      <svg
        className="w-4 h-4 dark:fill-white fill-zinc-800 transition-colors duration-300"
        viewBox="0 0 24 24"
      >
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-2.21 5.42-7.84 5.42-4.83 0-8.76-4.01-8.76-8.94s3.93-8.94 8.76-8.94c2.75 0 4.59 1.17 5.65 2.18l2.58-2.48C18.69 1.45 15.84 0 12.48 0 5.86 0 .5 5.37.5 12s5.36 12 11.98 12c6.91 0 11.5-4.86 11.5-11.7 0-.79-.08-1.39-.18-1.98h-11.32z" />
      </svg>
      Continue with Google
    </button>
  );
};
