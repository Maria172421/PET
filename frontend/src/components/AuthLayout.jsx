export default function AuthLayout({ children }) {
  return (
    <div style={styles.container}>
      {children}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
};
