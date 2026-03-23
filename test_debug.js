async function test() {
  try {
    const res = await fetch('http://localhost:3000/api/debug-data');
    console.log(await res.text());
  } catch (err) {
    console.error(err);
  }
}
test();
