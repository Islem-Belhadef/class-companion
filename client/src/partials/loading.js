import "../styles/loading.css";

function Loading() {
  return (
    <div className="loader">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
