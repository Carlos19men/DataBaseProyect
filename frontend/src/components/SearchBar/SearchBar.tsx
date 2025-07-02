import styles from './SearchBar.module.css'

interface SearchBarProps {
  etiqueta: string;
  viewWidth: number;
  viewHeight?: number; 
  value?: string; 
  onChange?: any;
  ejemplo: string;
  onSearchClick?: () => void; // Nueva prop opcional
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  etiqueta, viewWidth, viewHeight, value, onChange, ejemplo, onSearchClick
}) => {
  return (
    <span className={styles.container}>
      <span className={styles.texto}   style={{height:`${viewHeight}vh`}} >{etiqueta}</span>
        <input type="text" className={styles.barra}  placeholder={ejemplo}  style={{width:`${viewWidth}vw`,height:`${viewHeight}vh`}}
        value={value} onChange={onChange}></input>

        <button
          type="button"
          onClick={onSearchClick}
          style={{
            position: "sticky",
            background: "none",
            border: "none",
            padding: 0,
            margin: 0,
            cursor: "pointer",
            alignItems: "center",
            transform: "translate(-5vw,1vh) "
          }}
        >
          <svg width="8vh" height="8vh" viewBox="0 0 20 20" fill="none">
          <circle cx="9" cy="9" r="7" stroke="rgba(0,0,0,0.4)" strokeWidth="2"/>
          <line x1="14.5" y1="14.5" x2="19" y2="19" stroke="rgba(0,0,0,0.4)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
    </span>

  );
};

export default SearchBar