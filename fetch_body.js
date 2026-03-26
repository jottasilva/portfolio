async function fetchUrl() {
  const url = "https://supabase.ogerente.site/storage/v1/object/public/images/uploads/0.9669022437284297.png";
  const res = await fetch(url);
  const text = await res.text();
  console.log("Response body:", text);
}
fetchUrl();
