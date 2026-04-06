// PERF 1: The 7.4 MB SQL file is NOT bundled in the HTML at all.
// It lives in public/dvdRental.sql and is fetched on demand
// only when the user first opens the DVD Rental module.
// This shrinks the initial HTML from ~10 MB to ~2.5 MB.
export async function loadDvdRentalSQL(): Promise<string> {
  const response = await fetch('./dvdRental.sql');
  if (!response.ok) throw new Error(`Failed to fetch dvdRental.sql: ${response.status}`);
  return response.text();
}
