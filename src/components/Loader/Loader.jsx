import './Loader.css';

function Loader({ label = "Загружаем данные…" }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__reel" aria-hidden="true" />
      <span className="loader__label">{label}</span>
    </div>
  );
}

export default Loader;
