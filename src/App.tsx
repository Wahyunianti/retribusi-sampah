import { usePagination } from "./hooks/retribusi/usePagination";

function App() {
  const { data, lastItemRef, loading, hasMore } = usePagination();

  return (
    <div className="w-full h-full bg-amber-100">
      <div>
        <h2>Daftar Retribusi</h2>

        <ul>
          {data.map((item, index) => (
            <li key={item.id} ref={index === data.length - 1 ? lastItemRef : null}>
              {item.wajib_retribusi}
            </li>
          ))}
        </ul>

        {loading && <p>Loading...</p>}
        {!hasMore && <p>Tidak ada data lagi</p>}
      </div>
    </div>
  );
}

export default App;
