import "../styles/loading.css";

function Loading() {
  return (
    <div className="loader">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
