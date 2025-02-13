
function BlackButton({children,...props}){
    return (
        <button
          className="black-button"
          {...props}
        >
          {children}
        </button>
      );
}
export default BlackButton;