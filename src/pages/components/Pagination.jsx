import "./Pagination.css";
export default function Pagination ({page, setPage}) {
    return (
        <div className = "pagination">
            <button className="pagination_btn"
            disabled={page===1}
            onClick = {()=> setPage(page-1)}>
                Назад
            </button>
            
             <span style={{ minWidth: "100px", textAlign: "center" }}>Страница {page}</span>

            <button className="pagination_btn" onClick ={()=> setPage(page+1)}>
                Вперед
            </button>
        </div>
    );
}