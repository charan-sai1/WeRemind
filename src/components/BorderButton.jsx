function BorderButton({ children, ...props }) {
  return (
    <button
      className="border-button"
      {...props}
    >
      {children}
    </button>
  );
}
export default BorderButton;