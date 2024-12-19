export default function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h1>This page is not found!</h1>
      <a href="/">Back to home</a>
    </div>
  );
}
