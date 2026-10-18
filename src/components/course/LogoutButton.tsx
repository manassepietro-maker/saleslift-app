// "Log out" button for the course pages: ends the session and goes to the homepage.
export function LogoutButton({ className = "" }: { className?: string }) {
  return (
    <form action="/api/auth/signout" method="post">
      <button
        type="submit"
        className={`flex items-center gap-2 rounded-lg border border-c-line font-medium text-c-text hover:bg-c-hover ${className}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Log out
      </button>
    </form>
  );
}
