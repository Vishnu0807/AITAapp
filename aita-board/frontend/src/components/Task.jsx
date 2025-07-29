export default function Task({ title, description, onDelete }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "8px",
      marginBottom: "8px",
      borderRadius: "4px",
      backgroundColor: "#fff",
      boxShadow: "0 1px 2px #bbb"
    }}>
      <h4 style={{ margin: "0 0 4px 0" }}>{title}</h4>
      <p style={{ margin: 0 }}>{description}</p>
      <button onClick={onDelete} style={{ marginTop: 6, color: "#c00" }}>
        Delete
      </button>
    </div>
  );
}
